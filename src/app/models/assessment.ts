import { Base } from './base';

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
    this.questions = [];
  }
}

export class Question extends Base {
  title: string;
  text: string;
  point?: number;
  type: 'neuro' | 'profile' | 'objective';
  alternatives?: Alternative[];

  constructor() {
    super();
  }

  static get getTypes() {
    return [
      {id: 'neuro', name: 'Neuro'},
      {id: 'profile', name: 'Perfil'},
      {id: 'objective', name: 'Objetivo'}
    ];
  }
}

export class Alternative {
  text: string;
  type?: string;
  isCorrect?: boolean;

  static get getProfileTypes() {
    return [
      {id: 'dog', name: 'Cachorro'},
      {id: 'lion', name: 'Leão'},
      {id: 'monkey', name: 'Macaco'},
      {id: 'peacock', name: 'Pavão'}
    ];
  }
}
