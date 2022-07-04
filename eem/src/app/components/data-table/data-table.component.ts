import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PersonFormDialogComponent } from '../person-form-dialog/person-form-dialog.component';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/models/person';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  public displayedColumns: string[] = ['firstName', 'age', 'job'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  /**
   * it holds a list of active filter for each column.
   * example : {firstName: {contains : 'person 1'}}
   **/
  public columnsFilters = {};

  public dataSource: MatTableDataSource<Person>;
  private serviceSubscribe: Subscription | undefined;

  constructor(private personsService: PersonService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Person>();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


 


  // edit(data: Person) {
  //   const dialogRef = this.dialog.open(PersonFormDialogComponent, {
  //     width: '400px',
  //     data: data
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.personsService.edit(result);
  //     }
  //   });
  // }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.remove(id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.personsService.getAll();
    this.serviceSubscribe = this.personsService.persons$.subscribe(res => {
      this.dataSource.data = res;
    })
  }

  

}
