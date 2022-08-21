import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,public loginService:LoginService) { }


  isLoggedIn=false;
  user:any;
  username="";
  userRole="";
  ngOnInit(): void {
    console.log(this.isLoggedIn);
    this.loginService.loginStatusSubject.asObservable().subscribe((data)=>{
     console.log("event recieved from observable"+data);
    },(error)=>{
console.log(error);
    });
    this.isLoggedIn=this.loginService.isLogIn(); 
    this.userRole=this.loginService.getUserRole();
    this.user=this.loginService.getUser();
    if(this.user!=null)
    this.username=this.user!.username;
  }
  logOut(){
    this.loginService.logOut();
    this.username="";
    this.isLoggedIn=false;
  }
  navigateLogin(){
  this.router.navigateByUrl('/login');
  }
  navigateRegister(){
    this.router.navigateByUrl('/signup');
  }
}
