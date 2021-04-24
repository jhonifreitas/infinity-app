import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private subscriptions: {tag: string; sub: Subscription}[] = [];

  constructor() {}

  // STUDENT
  set setUser(data: Student) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  get getUser(): Student {
    return JSON.parse(localStorage.getItem('user'));
  }
  removeUser() {
    localStorage.removeItem('user');
  }

  // SUBSCRIPTION
  set addSubscription(data: {tag: string; sub: Subscription}) {
    const index = this.subscriptions.findIndex(sub => sub.tag === data.tag);
    if (index >= 0) {
      this.subscriptions[index].sub.unsubscribe();
      this.subscriptions.splice(index, 1);
    }
    this.subscriptions.push(data);
  }

  clearSubscriptions() {
    for (const subscribe of this.subscriptions) subscribe.sub.unsubscribe();
    this.subscriptions = [];
  }
}
