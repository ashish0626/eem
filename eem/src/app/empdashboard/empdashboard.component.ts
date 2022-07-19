import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../crud.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.scss']
})
export class EmpdashboardComponent implements OnInit {
  user:any;
  @ViewChild('ExcelDownload') table: ElementRef | undefined;
  constructor(private crudService: CrudService,) { }
  public emailid?: any;
  ngOnInit(): void {
    this.ReloadData();
  }
  ExportTOExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table?.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
    
  }
  

  public deleteuser(emailid : string) {
   
       //alert(emailid)
       this.crudService.deleteuser(emailid).subscribe(result => {
        //alert(result)
       if (result == true) {
             
           alert ("User Delete Successfully");
           this.ReloadData();
         }else if(result == false) {
          alert ("User not delete ");
         }
       })
     }
     public usertoadmin(emailid : string) {
   
      //alert(emailid)
      this.crudService.usertoadmin(emailid).subscribe(result => {
      if (result == "True") {
          alert ("User become admin ");
          this.ReloadData();
        }else if(result == "False") {
         alert ("User become admin ");
        }
      })
    }
     ReloadData(){
      this.crudService.getData().subscribe(data =>{
      
        console.warn("data",data);
        this.user=data;
      })
     }
  
}
