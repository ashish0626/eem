import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudService } from '../crud.service';
type AOA = any[][];

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss'],
})
export class TableBasicComponent {
  data: AOA = [[]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  emailid: any;
  public file: any;
  result: any;
  addemailid: any;
  public requestOptions: any;

  selectedFileName: string = 'No file chosen';
  validFileFlag: boolean = false;
  apiCallFlag: boolean = false;

  table: any;
  sheet: any;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.emailid = localStorage.getItem('email');
    //alert (this.emailid)
    //console.warn(localStorage.getItem('email'));
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    this.file = evt.target.files[0];

    if (evt.target.files[0]) {
      this.selectedFileName = evt.target.files[0].name;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      var aoa = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      this.data = aoa;

      /* validate excel file */
      this.validFileFlag = false;

      if (aoa.length > 0) {
        if (aoa[0].length === 1) {
          if (aoa[0][0].toLowerCase().trim() === 'report id') {
            alert('Excel file is valid!');
            this.validFileFlag = true;
          } else {
            alert(
              'Column name "' +
                aoa[0][0] +
                '" is invalid! It should be "Report ID"'
            );
          }
        } else {
          alert('File should contain only one column!');
        }
      } else {
        alert('File is not valid. Sheet is empty!');
      }
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

  public ImportData() {
    var formdata = new FormData();
    formdata.append('emailid', this.emailid);
    // formdata.append("excel", evt.target.files[0] ,"/C:/Users/mangalda/Downloads/Sample (6).xlsx");
    formdata.append('excel', this.file, this.file.name);
    this.requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://20.115.10.86:6002/excel', this.requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.warn(result);
        alert(result);
      })
      // .then(result =>this.result=result)
      .catch((error) => console.log('error', error));
  }

  public ImportDataEmail() {
    //alert(this.addemailid)
    var formdata = new FormData();
    formdata.append('emailid', this.addemailid);
    // formdata.append("excel", evt.target.files[0] ,"/C:/Users/mangalda/Downloads/Sample (6).xlsx");
    formdata.append('excel', this.file, this.file.name);
    this.requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://20.115.10.86:6002/excel', this.requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.warn(result);
        alert(result);
      })
      // .then(result =>this.result=result)
      .catch((error) => console.log('error', error));
  }
}
