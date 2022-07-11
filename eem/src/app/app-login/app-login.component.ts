import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyServiceService } from 'src/app/my-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
  providers: [MyServiceService]
})
export class AppLoginComponent implements OnInit {

  constructor(private routes: Router, private service: MyServiceService) { }
  msg = "";
  ngOnInit() {
  }
  check(uname: string, p: string) {
    var output = this.service.checkusernameandpassword(uname, p);
    if (output == true) {
      this.routes.navigate(['/dashboard']);
    }
    else {
      this.routes.navigate(['/dashboard']);
      this.msg = 'Invalid username or password';
    }
  }
}