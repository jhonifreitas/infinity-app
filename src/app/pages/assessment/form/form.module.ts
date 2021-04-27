import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AssessmentFormPage } from './form.page';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AssessmentFormPage }])
  ],
  declarations: [AssessmentFormPage]
})
export class AssessmentFormPageModule {}
