import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseAbstract } from '../abstract';
import { Department } from 'src/app/models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyDepartmentService extends FirebaseAbstract<Department> {

  static collectionName = 'company-departments';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, CompanyDepartmentService.collectionName);
  }
}
