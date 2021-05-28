import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseAbstract } from '../abstract';
import { Branch } from 'src/app/models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyBranchService extends FirebaseAbstract<Branch> {

  static collectionName = 'company-branches';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, CompanyBranchService.collectionName);
  }
}
