import { Base } from './base';
import { Assessment } from './assessment';

export class Access extends Base {
  code: string;
  used: number;
  validity: Date;
  quantity: number;

  mbas: string[];
  courses: string[];
  assessments: string[];

  _mbas?: any[];
  _courses?: any[];
  _assessments?: Assessment[];

  constructor() {
    super();
    this.used = 0;
    this.mbas = [];
    this.courses = [];
    this.quantity = 0;
    this.assessments = [];
  }
}
