import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private snack:MatSnackBar,private loginService:LoginService) { }
loginData={
  username:"",
  password:""
}
  ngOnInit(): void {
  }
  formSubmit(){
    if(this.loginData.username.trim()==""||this.loginData.username==null)
    {
      this.snack.open("Username is required",'',{
        duration:3000,
      });
      return;
    }
      if(this.loginData.password.trim()==""||this.loginData.password==null)
    {
      this.snack.open("Password is required",'',{
        duration:3000,
      });
      return;
    }
     this.loginService.generateToken(this.loginData).subscribe(
       (data:any)=>{
         console.log('success');
         console.log(data);
         this.loginService.loginUser(data.token);
         this.loginService.getCurrentUser().subscribe(
           (user)=>{
             console.log(user);
            this.loginService.setUser(user);
            console.log(this.loginService.getUserRole());
            if(this.loginService.getUserRole()=='Admin'){
                this.router.navigateByUrl('/admin').then(() => {
                  window.location.reload();
                });
                this.loginService.loginStatusSubject.next(true);
            }
            else if(this.loginService.getUserRole()=='NORMAL'||this.loginService.getUserRole()=='Normal')
            {
              this.router.navigateByUrl('/user-dashboard').then(() => {
                window.location.reload();
              });
              this.loginService.loginStatusSubject.next(true);
            }
            else{
              this.loginService.logOut();
            }
           },
           (error)=>{

           }
         )
       },
       (error)=>{
        console.log('Error');
        console.log(error);
        this.snack.open("Invalid details");
       }
     )
  }
 navigateRegister(){
  this.router.navigateByUrl('/signup');
  }
}
