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
    return this.getWhere('code', '==', code, null, null, 1).then(res => {
      if (res.length) {
        const doc = res[0];
        if (doc.validity < new Date()) return Promise.reject('Código expirado!');
        else if (doc.quantity > 0 && doc.used >= doc.quantity) return Promise.reject('Limite de uso do código atingido!');
        return doc;
      }
      return Promise.reject('Código não encontrado!');
    });
  }
}
