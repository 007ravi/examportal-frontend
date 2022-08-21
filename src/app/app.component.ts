import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  blurValue:number=7;
  constructor(private ngxService: NgxUiLoaderService){
    
  }
  ngOnInit(){

  }
  title = 'examfrontend';
}
