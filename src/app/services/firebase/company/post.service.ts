import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from 'src/app/models/company';
import { FirebaseAbstract } from '../abstract';

@Injectable({
  providedIn: 'root'
})
export class CompanyPostService extends FirebaseAbstract<Post> {

  static collectionName = 'company-posts';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, CompanyPostService.collectionName);
  }
}
