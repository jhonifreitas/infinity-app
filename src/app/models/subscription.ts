import { Base } from '../models/base';

export class Subscription extends Base {
  access: Access;
  student: Student;

  mbaId: MBA;
  courseId: Course;
  assessment: Assessment;
  
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

class Course {
  id: string;
  name: string;
}

class Assessment {
  id: string;
  name: string;
}

class MBA {
  id: string;
  name: string;
}