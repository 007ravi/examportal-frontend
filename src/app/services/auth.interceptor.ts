import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private loginService:LoginService){

    }
    intercept(req: import("@angular/common/http").HttpRequest<any>, 
    next: import("@angular/common/http").HttpHandler): 
    import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
         let authReq=req;
        const token=this.loginService.getToken();
        if(token!=null){
            authReq=authReq.clone({
                setHeaders:{AuthorizationToken: `Bearer ${token}`},
            });
        }

        return next.handle(authReq);
    }

}
export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi:true,

    },
];