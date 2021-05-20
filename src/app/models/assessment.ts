import { Base } from './base';

export class Assessment extends Base {
  name: string;
  duration: number;
  groups: string[];
  instructions: string[];
  type: 'neuro' | 'profile' | 'objective';

  _groups?: Group[];
  _questions?: Question[];
  _instructions?: Instruction[];

  constructor() {
    super();
    this.groups = [];
    this.instructions = [];
  }
}

export class Instruction extends Base {
  title: string;
  text: string;

  constructor() {
    super();
  }
}

export class Group extends Base {
  name: string;
  image: string;
  questions: string[];

  _questions?: Question[];

  constructor() {
    super();
    this.questions = [];
  }
}

export class Question extends Base {
  title: string;
  text: string;
  point?: number;
  result?: string;
  alternatives?: Alternative[];
  type: 'neuro' | 'profile' | 'objective';

  constructor() {
    super();
  }
}

export class Alternative {
  text: string;
  type?: string;
  isCorrect?: boolean;
}
