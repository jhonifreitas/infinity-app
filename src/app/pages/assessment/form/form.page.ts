import { ActivatedRoute } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Application } from 'src/app/models/application';
import { Assessment, Question } from 'src/app/models/assessment';

import { UtilService } from 'src/app/services/util.service';
import { AssessmentService } from 'src/app/services/firebase/assessment/assessment.service';
import { AssessmentGroupService } from 'src/app/services/firebase/assessment/group.service';
import { AssessmentQuestionService } from 'src/app/services/firebase/assessment/question.service';
import { AssessmentInstructionService } from 'src/app/services/firebase/assessment/instruction.service';
import { ApplicationService } from 'src/app/services/firebase/application.service';

@Component({
  selector: 'app-assessment-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss']
})
export class AssessmentFormPage implements OnInit {

  @ViewChild('slides') ionSlides: IonSlides;

  isEnd = false;
  activeIndex = 0;
  isBeginning = true;
  formGroup: FormGroup;
  assessment: Assessment;
  data = new Application();
  slideOpts = {
    autoHeight: true,
    allowTouchMove: false
  }

  constructor(
    private _util: UtilService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _group: AssessmentGroupService,
    private _assessment: AssessmentService,
    private activatedRoute: ActivatedRoute,
    private _application: ApplicationService,
    private _question: AssessmentQuestionService,
    private _instruction: AssessmentInstructionService,
  ) {
    this.formGroup = this.formBuilder.group({
      answers: this.formBuilder.array([])
    });
  }

  async ngOnInit() {
    const loader = await this._util.loading();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    await this._assessment.getById(id).then(async assessment => {
      this.assessment = assessment;
      await this.getInstructions();
      await this.getGroups();
    }).catch(err => {
      this._util.message('Assessment não encontrado!');
      this.goToBack();
    });
    loader.dismiss();
  }

  async getInstructions() {
    this.assessment._instructions = [];
    for (const instructionId of this.assessment.instructions) {
      const instruction = await this._instruction.getById(instructionId);
      this.assessment._instructions.push(instruction);
    }
  }

  async getGroups() {
    this.assessment._groups = [];
    this.assessment._questions = [];
    for (const groupId of this.assessment.groups) {
      const group = await this._group.getById(groupId);
      group._questions = [];
      
      for (const questionId of group.questions) {
        const question = await this._question.getById(questionId);
        this.assessment._questions.push(question);
        this.addQuestion(question);
        group._questions.push(question);
      }

      this.assessment._groups.push(group);
    }
  }

  getFormContact(type: 'neuro' | 'objective' | 'dissertation') {
    if (type == 'neuro') {
      return this.formBuilder.group({
        intensity: ['', Validators.required],
        satisfaction: ['', Validators.required]
      });
    } else if (type == 'objective') {
      return this.formBuilder.group({
        alternativeId: ['', Validators.required]
      });
    } else {
      return this.formBuilder.group({
        text: ['', Validators.required]
      });
    }
  }

  addQuestion(question: Question) {
    const formGroup = this.getFormContact(question.type);
    (this.formGroup.get('answers') as FormArray).push(formGroup);
  }

  async slideChanged() {
    this.activeIndex = await this.ionSlides.getActiveIndex();
  }

  async prev() {
    this.ionSlides.slidePrev();
    this.isEnd = await this.ionSlides.isEnd();
    this.isBeginning = await this.ionSlides.isBeginning();
  }

  async next() {
    if (this.activeIndex === this.assessment.instructions.length - 1) await this.createApplication();
    this.ionSlides.slideNext();
    this.isEnd = await this.ionSlides.isEnd();
    this.isBeginning = await this.ionSlides.isBeginning();
  }

  async createApplication() {
    await this._util.alertConfirm(
      'Atenção!',
      `Você tem ${this.assessment.duration} horas, a partir de agora para concluir.<h4>Boa sorte!</h4>`,
      'Iniciar', 'cancelar'
    ).then(async _ => {  
      const loader = await this._util.loading('Iniciando...');
      await this._application.add(this.data);
      loader.dismiss();
    }).catch(_ => {});
  }

  onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      

    } else this._util.message('Preencha os dados corretamente antes de prosseguir!');
  }

  goToBack() {
    this.navCtrl.back();
  }
}
