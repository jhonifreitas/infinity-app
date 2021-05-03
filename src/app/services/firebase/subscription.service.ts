import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { StorageService } from '../storage.service';
import { Subscription } from 'src/app/models/subscription';
import { FirebaseAbstract, FirebaseWhere } from './abstract';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends FirebaseAbstract<Subscription> {

  static collectionName = 'subscriptions';

  constructor(
    protected db: AngularFirestore,
    private _storage: StorageService
  ) {
    super(db, SubscriptionService.collectionName);
  }

  async getByStudentId(whereColumn: string, id: string): Promise<Subscription> {
    const studentId = this._storage.getUser.id;
    const where = [
      new FirebaseWhere(whereColumn, '==', id),
      new FirebaseWhere('student.id', '==', studentId)
    ];
    return this.getWhereMany(where).then(res => res.length ? res[0] : Promise.reject('Not found!'));
  }
}
