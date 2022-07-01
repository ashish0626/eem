import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-employeedata',
  templateUrl: './employeedata.component.html',
  styleUrls: ['./employeedata.component.scss']
})
export class EmployeedataComponent implements OnInit {
  formGroup:FormGroup | any;
  constructor(
    
  ) { }

  ngOnInit(): void {
    this.initform();
  }
initform(){
  this.formGroup= new FormGroup({
    FirstName : new FormControl (''),
    LastName : new FormControl (''),
    EmailID : new FormControl (''),
    Password : new FormControl (''),
    Role : new FormControl ('')
  });
}
public regProcess(){
  return "Test";
}
}
