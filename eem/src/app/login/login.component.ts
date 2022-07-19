// import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { MyServiceService } from '../my-service.service';

import { empresponse } from '../empresponse';

 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public books: any;
  public status: any;
  
  formGroup: FormGroup | any;
  Empresponse: empresponse[] = [];
  user:any
  email:any

  constructor(
    private authService: AuthService,
    private crudService: CrudService,
    private service: MyServiceService,
    // private crud:CrudService,
    private _route: Router
  ) { }
  msg = "";
  
  ngOnInit() {
    this.initform();
    
  }
  initform() {
    this.formGroup = new FormGroup({
      emailid: new FormControl('', [Validators.required]),
      userpwd : new FormControl ('',[Validators.required])
    });
  }
  
  public loginProcess() {
   if (this.formGroup.valid) {
      
      this.authService.login(this.formGroup.value).subscribe(result => {
     //alert(result);
        if (result == true) {
          this.email= this.formGroup.get('emailid').value;
          
            //localStorage.setItem('token',result.token);
          this._route.navigate(['/empdashboard']);
          localStorage.setItem('email',this.email);
        } else if (result == false){
          //this._route.navigate(['/dash']);
          this.msg = 'Invalid username or password';
        }
      })
    }
  }
   
  

  check(uname: string, p: string) {
    var output = this.service.checkusernameandpassword(uname, p);
    if (output == true) {
      this._route.navigate(['/dashboard']);
    }
    else {
      this.msg = 'Invalid username or password';
    }
  }

 
}
