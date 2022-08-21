import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description:''
  };
  constructor(private _category:CategoryService,private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }
  addCategory(){
    console.log(JSON.stringify(this.category));
    if(this.category.title.trim()=='' ||this.category.title==null){
      this._snackbar.open("Title Required !! ",'',{
        duration:3000
      })
    }
    this._category.addCategory(this.category).subscribe((data:any)=>{
      Swal.fire("Success !!",'Category added','success');
      this.category.title='';
      this.category.description='';
    },
    (err)=>{
      Swal.fire('Error!!','server error!!','error');
    })
  }

}
