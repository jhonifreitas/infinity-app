import { Base } from './base';

export class Application extends Base {
  init: Date;
  end?: Date;
  student: Student;
  answers: Answer[];

  mba?: MBA;
  course?: Course;
  assessment?: Assessment;

  constructor() {
    super();
    this.answers = [];
    this.init = new Date();
    this.student = new Student();
  }
}

class Student {
  id: string;
  code: string;
}

class Answer {
  datetime: Date;

  text?: string;
  alternativeId?: string;
  neuro: {
    intensity: number;
    satisfaction: number;
  };
}

class MBA {
  id: string;
  code: string;
}

class Course {
  id: string;
  code: string;
}

class Assessment {
  id: string;
  code: string;
}
