import { Base } from '../models/base';

export class Subscription extends Base {
  access: Access;
  student: Student;

  mbaId?: string;
  courseId?: string;
  assessmentId?: string;

  constructor() {
    super();
    this.access = new Access();
    this.student = new Student();
  }
}

class Access {
  id: string;
  code: string;
}

class Student {
  id: string;
  name: string;
}
