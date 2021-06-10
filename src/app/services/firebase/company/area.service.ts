import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Area } from 'src/app/models/company';
import { FirebaseAbstract } from '../abstract';

@Injectable({
  providedIn: 'root'
})
export class CompanyAreaService extends FirebaseAbstract<Area> {

  static collectionName = 'company-areas';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, CompanyAreaService.collectionName);
  }
}
