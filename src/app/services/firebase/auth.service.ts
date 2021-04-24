import firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Student } from 'src/app/models/student';

import { StudentService } from './student.service';
import { StorageService } from '../storage.service';
import { AuthErrorCodeMessages } from 'src/app/exceptions/authentication-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private _storage: StorageService,
    private _student: StudentService,
  ) { }

  async register(data: Student, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const param: any = {
        ...data,
        password,
        authType: 'email'
      };
      this.auth.createUserWithEmailAndPassword(data.email, password).then(credential => {
        const uid = credential.user.uid;
        this._student.set(uid, param).then(_ => {
          this._storage.setUser = data;
          resolve(uid);
        });
      }).catch(err => reject(AuthErrorCodeMessages.auth[err.code] || 'Houve um erro ao realizar o cadastro. Por favor, tente novamente.'));
    });
  }

  signInEmail(email: string, password: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then(async credential => {
        resolve(credential.user.uid);
      }).catch(err => reject(AuthErrorCodeMessages.auth[err.code] || 'Houve um erro ao realizar o login. Por favor, tente novamente.'));
    });
  }

  signInGoogle(): Promise<void> {
    return this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  signInFacebook(): Promise<void> {
    return this.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  signInApple(): Promise<void> {
    return this.auth.signInWithRedirect(new firebase.auth.OAuthProvider('apple.com'));
  }

  signInPhone(phone: string, appVerifier: firebase.auth.RecaptchaVerifier) {
    return this.auth.signInWithPhoneNumber(`+55${phone}`, appVerifier);
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  signOut() {
    this._storage.clearSubscriptions();
    return this.auth.signOut();
  }
}
