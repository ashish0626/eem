import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudService } from '../crud.service';
type AOA = any[][];

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss']
})
export class TableBasicComponent {
  data: AOA = [[]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  emailid: any
  constructor(private crudService: CrudService,) { }

  ngOnInit(): void {
    this.emailid= localStorage.getItem('email');
    //alert (this.emailid)
    //console.warn(localStorage.getItem('email'));
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public ImportData(emailid: string) {
    alert(emailid)
    this.crudService.ImportData(emailid).subscribe(result => {
      //alert(result)
      if (result == true) {

        alert("User Delete Successfully");

      } else if (result == false) {
        alert("User not delete ");
      }
    })
  }
}

