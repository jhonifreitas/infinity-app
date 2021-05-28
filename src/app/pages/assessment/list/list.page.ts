import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { Assessment } from 'src/app/models/assessment';

import { UtilService } from 'src/app/services/util.service';
import { SubscriptionPage } from '../../subscription/subscription.page';
import { ApplicationService } from 'src/app/services/firebase/application.service';
import { SubscriptionService } from 'src/app/services/firebase/subscription.service';
import { AssessmentService } from 'src/app/services/firebase/assessment/assessment.service';

@Component({
  selector: 'app-assessment-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class AssessmentListPage implements OnInit {

  items: Assessment[];

  constructor(
    private _util: UtilService,
    private popoverCtrl: PopoverController,
    private _assessment: AssessmentService,
    private _applications: ApplicationService,
    private _subscription: SubscriptionService
  ) {}

  async ngOnInit() {
    const loader = await this._util.loading('Verificando acesso...');
    await this._subscription.getByStudentId().then(subscription => {
      loader.dismiss();
      this.getAssessments(subscription.assessmentIds);
    }).catch(_ => {
      loader.dismiss();
      this.openSubscription();
    });
  }

  async getAssessments(assessmentIds: string[]) {
    const loader = await this._util.loading('Liberando acesso...');
    this.items = [];
    for (const assessmentId of assessmentIds) {
      const application = await this._applications.getByAssessmentId(assessmentId).catch(_ => {});
      if (!application || !application.end) {
        const assessment = await this._assessment.getById(assessmentId);
        this.items.push(assessment);
      }
    }
    loader.dismiss();
  }

  async openSubscription() {
    const popover = await this.popoverCtrl.create({component: SubscriptionPage});
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data) this.getAssessments(data.assessmentIds);
  }
}
