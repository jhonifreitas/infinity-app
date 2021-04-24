import { Component, OnInit } from '@angular/core';

import { Assessment } from 'src/app/models/assessment';

import { UtilService } from 'src/app/services/util.service';
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
    private _assessment: AssessmentService
  ) {}

  async ngOnInit() {
    const loader = await this._util.loading();
    this.items = await this._assessment.getAllActive();
    loader.dismiss();
  }
}
