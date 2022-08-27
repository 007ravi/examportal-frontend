import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ResultService } from 'src/app/services/result.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
results:any;
constructor(private _resultService:ResultService,private _loginService:LoginService){
    
}
  ngOnInit(){
    let user=this._loginService.getUser();
    console.log(user);
    this._resultService.getAllResult().subscribe((data:any)=>{
      this.results=data;
    },(err:any)=>{

    })
  }
}