import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssessmentFormPage } from './form.page';
import { RandomPipe } from 'src/app/pipes/random.pipe';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AssessmentFormPage }])
  ],
  declarations: [AssessmentFormPage],
  providers: [RandomPipe]
})
export class AssessmentFormPageModule {}
