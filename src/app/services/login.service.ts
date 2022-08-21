import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 public loginStatusSubject=new Subject<boolean>();
  constructor(private http:HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/currentUser`);
  }

  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }
  //login user set token
  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  //islogin : user is login ornot
  public isLogIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=="" || tokenStr=="false")
    return false;
    else 
    return true;}

  public logOut()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
 
  public getToken(){
    return localStorage.getItem("token");
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr=localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    else{
      this.logOut();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
