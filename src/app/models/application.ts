import { Base } from './base';
import { Question } from './assessment';

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

export class Answer {
  datetime: Date;
  question: Question;

  alternative?: string;
  neuro: {
    intensity: number;
    satisfaction: number;
  };

  constructor() {
    this.datetime = new Date();
  }
}

class Student {
  id: string;
  name: string;
}

class MBA {
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
