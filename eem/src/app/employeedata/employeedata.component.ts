import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudService } from '../crud.service';


@Component({
  selector: 'app-employeedata',
  templateUrl: './employeedata.component.html',
  styleUrls: ['./employeedata.component.scss']
})
export class EmployeedataComponent implements OnInit {
  formGroup:FormGroup | any;
  constructor(private crudService: CrudService,
    
  ) { }

  ngOnInit(): void {
    this.initform();
  }
initform(){
  this.formGroup= new FormGroup({
    fname : new FormControl (''),
    lname : new FormControl (''),
    emailid : new FormControl (''),
    userpwd : new FormControl (''),
    userRole : new FormControl ('')
  });
}
public regProcess(){
  return "Test";
}

public createuser() {
  if (this.formGroup.valid) {
     
     this.crudService.createuser(this.formGroup.value).subscribe(result => {
     //alert(result);
       if (result == true) {
         alert ("Employee Added Succesfully");
         
       } else if ((result == false)) {
        alert ("Unable Added Employee");
       }
     })
   }
 }
}
