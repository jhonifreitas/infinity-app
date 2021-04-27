import { Base } from '../models/base';

export class Subscription extends Base {
  student: Student;
  accessCode: string;
  assessment?: Assessment;

  constructor() {
    super();
    this.student = new Student();
  }
}

class Student {
  id: string;
  name: string;
}

class Assessment {
  id: string;
  name: string;
}