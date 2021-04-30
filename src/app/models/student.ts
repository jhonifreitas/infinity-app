import { Base } from './base';

export class Student extends Base {
  name: string;
  email: string;
  authType: 'email' | 'google' | 'facebook' | 'apple';
  
  token: string;
  image?: string;
  phone?: string;
  genre?: string;
  placeBirth?: string;
  civilStatus?: string;

  rg?: string;
  cpf?: string;
  rgEmitter?: string;
  
  motherName?: string;
  spouseName?: string;
  
  social?: Social;
  course?: Course;
  address?: Address;
  company?: Company;

  constructor() {
    super();
    this.authType = 'email';
  }
}

export class Social {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

export class Course {
  name: string;
  institute: string;
  city: string;
  state: string;
  conclusion?: Date;
}

export class Address {
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
  zipcode: string;
  complement?: string;
}

export class Company {
  name: string;
  post: string;
}
