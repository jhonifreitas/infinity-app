import { Base } from '../models/base';

export class Assessment extends Base {
  name: string;
  duration: number;
  groups: string[];
  instructions: string[];

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
  }
}

export class Question extends Base {
  title: string;
  text: string;
  type: 'dissertation' | 'objective' | 'neuro';
  alternatives?: Alternative[];

  constructor() {
    super();
  }

  get getTypes() {
    return [
      {id: 'neuro', name: 'Neuro'},
      {id: 'objective', name: 'Objetivo'},
      {id: 'dissertation', name: 'Dissertativo'}
    ];
  }
}

export class Alternative {
  text: string;
  isCorrect: boolean;

  constructor() {
    this.isCorrect = false;
  }
}
