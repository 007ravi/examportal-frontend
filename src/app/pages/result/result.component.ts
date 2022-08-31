import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ResultService } from 'src/app/services/result.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
results:any;
quizId:any;
  isData: any=0;
constructor(private _route:ActivatedRoute,private _resultService:ResultService,private _loginService:LoginService){
    
}
  ngOnInit(){
    this.quizId=this._route.snapshot.params.quizId;
    let user=this._loginService.getUser();
    console.log(user);
    if(user.authorities[0].authority=='Admin'){
    this._resultService.getAllResult().subscribe((data:any)=>{
      this.results=data;
      this.isData=Object.keys(this.results).length;
    },(err:any)=>{

    })
  }
  else{
    this._resultService.getResultByUser(user.username).subscribe((data:any)=>{
      this.results=data;
      console.log(this.results);
      this.isData=Object.keys(this.results).length;
    },(err:any)=>{

    })
  }
  
  }
}