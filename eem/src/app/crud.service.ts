import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { empresponse } from './empresponse';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiServer = "http://20.115.10.86:7003/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }
 
 
  public getAll(): Observable<empresponse[]> {
    return this.http.get<empresponse[]>(this.apiServer + 'getData',{responseType: 'json'})
    .pipe(
      map((data: empresponse[]) => {
        return data;
      }),
      catchError(this.errorHandler)
    )
  }
  errorHandler(error : HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

 getCountries(){
  return this.http.get<empresponse[]>('http://20.115.10.86:7003/getData'); 
  }

  getData (){
   //let url = "https://jsonplaceholder.typicode.com/todos/";
    let url ="http://20.115.10.86:7003/getData";
    return this.http.get(url);
  }
  
}
