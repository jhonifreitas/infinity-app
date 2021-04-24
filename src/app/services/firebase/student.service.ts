import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { FirebaseAbstract } from './abstract';
import { Student } from 'src/app/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends FirebaseAbstract<Student> {

  static collectionName = 'students';

  constructor(
    protected db: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    super(db, StudentService.collectionName);
  }

  uploadImage(id: string, file: Blob | File): Promise<string> {
    return new Promise(resolve => {
      const url = `${StudentService.collectionName}/${id}.png`;
      this.afStorage.ref(url).put(file).then(async (res) => {
        resolve(await res.ref.getDownloadURL());
      });
    });
  }

  deleteImage(id: string): Promise<boolean> {
    return new Promise(resolve => {
      const url = `${StudentService.collectionName}/${id}.png`;
      this.afStorage.ref(url).delete().subscribe(async _ => {
        await this.update(id, {image: null});
        resolve(true);
      });
    });
  }
}
