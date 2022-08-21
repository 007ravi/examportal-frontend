import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginService.isLogIn()){
        return true;
      }
      if( this.loginService.getUserRole()=='ADMIN')
      {
        this.router.navigateByUrl('/admin/profile');
      }
      else if(this.loginService.getUserRole()=='NORMAL'){
        this.router.navigate(['user-dashboard']);
      }
      return false;
  }
  
}
