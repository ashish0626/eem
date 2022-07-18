import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMsg: any;
  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
   // alert(data.emailid)
    return this.http.post("http://20.115.10.86:7003/checkCredentials",data,{responseType: 'json'}).pipe(
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
