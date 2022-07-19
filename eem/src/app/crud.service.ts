import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
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
  public emailid?: any;
  errorMsg: any;
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
  
  

  createuser(data: any):Observable<any>{
    // alert(data.emailid)
     return this.http.post(this.apiServer + "addUser",data,{responseType: 'json'}).pipe(
       catchError(error => {
           this.errorMsg = error.message;
           return of([this.getServerErrorMessage]);
       })
   );
   }
   deleteuser(emailid : any):Observable<any>{

    
     //alert(emailid)
     return this.http.post(this.apiServer + "removeUser",{emailid: emailid},{responseType: 'json'}).pipe(
       catchError(error => {
           this.errorMsg = error.message;
           return of([this.getServerErrorMessage]);
       })
   );
   }
   ImportData (emailid : any){
    //alert(emailid)
    return this.http.post(this.apiServer + "excel",{emailid: emailid},{responseType: 'json'}).pipe(
      catchError(error => {
          this.errorMsg = error.message;
          return of([this.getServerErrorMessage]);
      })
  );
   }
  private getServerErrorMessage(error: HttpErrorResponse): string {
     switch (error.status) {
         case 404: {
           return `Not Found: ${error.message}`;
         }
         case 403: {
             return `Access Denied: ${error.message}`;
         }
         case 500: {
             return `Internal Server Error: ${error.message}`;
         }
         default: {
             return `Unknown Server Error: ${error.message}`;
         }
       }
     }
}
