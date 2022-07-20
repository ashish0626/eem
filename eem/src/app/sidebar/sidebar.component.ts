import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isShownuser: boolean = false;
  isShownadmin: boolean = false;
  roleval:any
  constructor() { }

  ngOnInit() {
    this.toggleShow();
  }
  toggleShow() {
    this.roleval = localStorage.getItem('role');
    if (this.roleval == "user") {
     // this.isShownuser = true;
      this.isShownuser = !this.isShownuser;
    } else if (this.roleval == "admin"){
      this.isShownadmin = !this.isShownadmin;
    }
    
    
  }
}
