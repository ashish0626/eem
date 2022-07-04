export class Person {
  id: any;
  firstName: string;
  age: number;
  job: string;

  constructor(id: any = null, firstName: string = 'j', age: number = 0, job: string = '') {
    this.id = id;
    this.firstName = firstName;
    this.age = age;
    this.job = job;
  }
}

