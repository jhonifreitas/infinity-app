import { Base } from './base';

export class Company extends Base {
  name: string;
  image?: string;

  constructor() {
    super();
  }
}

export class Branch extends Base {
  name: string;
  companyId: string;

  _company?: Company;
}

export class Department extends Base {
  name: string;
  branchId: string;

  _branch?: Branch;
}

export class Post extends Base {
  name: string;
  level: number;
  departmentId: string;

  _department?: Department;
}
