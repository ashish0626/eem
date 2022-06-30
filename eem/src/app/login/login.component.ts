// import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
//import { CrudService } from '../crud.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public books: any;
  public status: any;
  formGroup:FormGroup | any;
  constructor(
    private authService:AuthService,
   // private crud:CrudService,
    private _route:Router
    ) { }

  ngOnInit() {
    this.initform();
  }
  initform(){
  this.formGroup= new FormGroup({
    Username : new FormControl ('',[Validators.required]),
    Password : new FormControl ('',[Validators.required])
  });
}
 public loginProcess(){
    if(this.formGroup.valid){
        this.authService.login(this.formGroup.value).subscribe(result=>{
          if(result.message=="Success"){
            
            localStorage.setItem('token',result.token);
            this._route.navigate(['/side-menu']);
          }else {
            alert("User name and password incorrect")
            console.log(result);
          }
        })
      }
    }
   
}
