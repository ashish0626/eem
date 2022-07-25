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
  user: any
  email: any
  role: any
  roleval: any

  isShown: boolean = false;
  isShownemail: boolean = true;
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
      userpwd: new FormControl('', [Validators.required])
    });
  }

  public loginProcess() {
    if (this.formGroup.valid) {

      this.authService.login(this.formGroup.value).subscribe(result => {
        //alert(result);
        if (result == true) {
          this.email = this.formGroup.get('emailid').value;

          //localStorage.setItem('token',result.token);

          if (this.role == "user" || this.role == "User") {
            
            this._route.navigate(['/importexcel'])
          } else if (this.role == "admin" || this.role == "Admin") {
            this._route.navigate(['/empdashboard']);
          } else {
            alert("Role is not assign");
            location.reload();
          }
          
          localStorage.setItem('email', this.email);
        } else if (result == false) {
          
          this.msg = 'Invalid username or password';
        }
      })
    }
  }

  public empRole(emailid: string) {
    this.email = this.formGroup.get('emailid').value;
    //alert(this.email)
    this.crudService.empRole(this.email).subscribe(result => {
      //alert (result)
      this.role = result;
      // if (this.role == "user") {
      //     alert ("user");
      //     localStorage.setItem('role',this.role);
      //   }else if(this.role == "admin") {
      //     localStorage.setItem('role',this.role);
      //   } else {
      //     alert ("Role is not assign");
      //   }
      if (this.role != null) {
        this.toggleShow();
        localStorage.setItem('role', this.role);
        this.roleval = localStorage.getItem('role');
       // alert(this.roleval)
      } else {
         alert("Employee doesn't exits");
      }
    })
  }
  toggleShow() {
    this.isShown = !this.isShown;
    this.isShownemail = !this.isShownemail;
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
