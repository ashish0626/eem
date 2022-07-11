import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token = localStorage.getItem('token');
        req= this.addToken(req,token?.toString());
       return next.handle(req);
    }

    private addToken (req:HttpRequest<any>,token?:string)
    {
        return req.clone(
        {
            setHeaders: {'Authorization': `Bearer ${token}`}
        });
    }
}
