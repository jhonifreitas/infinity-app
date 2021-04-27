import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseAbstract } from './abstract';
import { Subscription } from 'src/app/models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends FirebaseAbstract<Subscription> {

  static collectionName = 'subscriptions';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, SubscriptionService.collectionName);
  }

  async getByStudentId(studentId: string): Promise<Subscription> {
    return this.getWhere('student.id', '==', studentId).then(res => res.length ? res[0] : Promise.reject('Not found!'));
  }
}
