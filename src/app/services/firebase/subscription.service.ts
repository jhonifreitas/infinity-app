import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription } from 'src/app/models/subscription';
import { FirebaseAbstract, FirebaseWhere } from './abstract';

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

  async getByStudentId(studentId: string, whereColumn: string, id: string): Promise<Subscription> {
    const where = [
      new FirebaseWhere(whereColumn, '==', id),
      new FirebaseWhere('student.id', '==', studentId)
    ];
    return this.getWhereMany(where).then(res => res.length ? res[0] : Promise.reject('Not found!'));
  }
}
