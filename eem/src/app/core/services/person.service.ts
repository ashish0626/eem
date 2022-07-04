import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { personsData } from '../constants/persons-static-data';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  persons$: BehaviorSubject<Person[]>;
  persons: Array<Person> = [];
  constructor() {
    this.persons$ = new BehaviorSubject <Person[]>([]);
    this.persons = personsData;
  }

  getAll() {
    this.persons$.next(this.persons);
  }

  add(person: Person) {
    this.persons.push(person);
  }

  

  remove(id: number) {

    this.persons = this.persons.filter(p => {
      return p.id != id
    });

    this.persons$.next(this.persons);
  }

}
