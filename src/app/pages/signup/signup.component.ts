import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatFormField} from '@angular/material/form-field';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar,private router:Router) { }
public user={
username:'',
password:'',
firstName:'',
lastName:'',
email:'',
phone:'',
}
  ngOnInit(): void {
  }
  formSubmit(){
    if(this.user.username=='' || this.user.username==null){
      this.snack.open('Please Enter username!!','X',{
        duration:2500,
        // verticalPosition:'top',
        // horizontalPosition:'right'
      })
      return;
    }

    console.log(this.user.username);
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
       console.log(data);
       Swal.fire('Success',data.username+' registered successfully!! User id is '+data.id,'success');
      },
      (error:any)=>{
  console.log(error);
  this.snack.open('Something went wrong!!!','X',{
    duration:2500,})
  
      }
    )
  }

  navigateLogin(){
    this.router.navigateByUrl('/login');
    }

}
