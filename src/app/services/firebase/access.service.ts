import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Access } from 'src/app/models/access';
import { FirebaseAbstract, FirebaseWhere } from './abstract';

@Injectable({
  providedIn: 'root'
})
export class AccessService extends FirebaseAbstract<Access> {

  static collectionName = 'access-contents';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, AccessService.collectionName);
  }

  async getByCode(code: string) {
    const where = [
      new FirebaseWhere('code', '==', code),
      new FirebaseWhere('validity', '>=', new Date())
    ];
    return this.getWhereMany(where, null, null, 1).then(res => {
      if (res.length) {
        const doc = res[0];
        if (doc.quantity > 0 && doc.used >= doc.quantity) return Promise.reject();
        return doc;
      }
      return Promise.reject('Código não encontrado!');
    });
  }
}
