import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

categories=[
  {
    cid:23,
    title:'Programming',
    description:'this is testing category'
  },
  {
    cid:23,
    title:'Programming',
    description:'this is testing category'
  },
  {
    cid:23,
    title:'Programming',
    description:'this is testing category'
  }
]

  constructor(private _category:CategoryService) { }
  

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(data);
    },
    (error)=>{
      Swal.fire("Error!!","Error in loading Categories",'error');
    })
  }

  deleteCategory(cat:any){
    console.log(cat);
    this._category.deleteCategory(cat.cid).subscribe((data)=>{

      Swal.fire("Deleted","Category "+cat.title+" deleted.",'success');
      let removeIndex = this.categories.map(item => item.cid).indexOf(cat.cid);
      this.categories.splice(removeIndex, 1);
    },
    (err)=>{
      Swal.fire("Error","Error  delete Category "+cat.title,'error');
    });
  }
}
