// import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
//import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public books: any;
  public status: any;
  public abc: string | undefined;
  formGroup: FormGroup | any;
  constructor(
    private authService: AuthService,
    private crudService: CrudService,
    // private crud:CrudService,
    private _route: Router
  ) { }

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
   // this.abc = (this.formGroup.get('emailid').value);
    if (this.formGroup.valid) {
      this._route.navigate(['/dash']);
      this.authService.login(this.formGroup.value).subscribe(result => {
        if (result.message == "Success") {
          this._route.navigate(['/dash']);
          //localStorage.setItem('token',result.token);
          //this._route.navigate(['/side-menu']);
        } else {
          this._route.navigate(['/']);
          alert("Email id and password incorrect")
          console.log(result);
        }
      })
    }
  }
   
  public GetUser(){
    this.crudService.getpublicdata().subscribe(result=>{
      this.books = result;
      alert(this.books);
      console.log(result)
    })
  }

}
