import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _categoryService:CategoryService,private _snack:MatSnackBar) { }

  categories:any;
  ngOnInit(): void {
    this._categoryService.categories().subscribe((data)=>{
      this.categories=data;
    },
    (err)=>{
      this._snack.open("Error in loading categories from server",'',{
        duration:3000,
      });
    })
  }

}
