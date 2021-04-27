import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Assessment } from 'src/app/models/assessment';

import { UtilService } from 'src/app/services/util.service';
import { AssessmentService } from 'src/app/services/firebase/assessment/assessment.service';
import { AssessmentGroupService } from 'src/app/services/firebase/assessment/group.service';
import { AssessmentQuestionService } from 'src/app/services/firebase/assessment/question.service';
import { AssessmentInstructionService } from 'src/app/services/firebase/assessment/instruction.service';

@Component({
  selector: 'app-assessment-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss']
})
export class AssessmentFormPage implements OnInit {

  assessment: Assessment;

  constructor(
    private _util: UtilService,
    private navCtrl: NavController,
    private _group: AssessmentGroupService,
    private _assessment: AssessmentService,
    private activatedRoute: ActivatedRoute,
    private _question: AssessmentQuestionService,
    private _instruction: AssessmentInstructionService,
  ) {}

  async ngOnInit() {
    const loader = await this._util.loading();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    await this._assessment.getById(id).then(async assessment => {
      this.assessment = assessment;
      await this.getInstructions();
    }).catch(_ => {
      this._util.message('Assessment não encontrado!');
      this.goToBack()
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
      
      for (const questionId of group.questions) {
        const question = await this._question.getById(questionId);
        this.assessment._questions.push(question);
        group._questions.push(question);
      }

      this.assessment._groups.push(group);
    }
  }

  goToBack() {
    this.navCtrl.back();
  }
}
