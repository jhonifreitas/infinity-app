import { Base } from './base';

export class Student extends Base {
  name: string;
  email: string;
  image?: string;
  token?: string;
  authType: 'email' | 'facebook' | 'google' | 'apple';

  constructor() {
    super();
    this.authType = 'email';
  }
}
