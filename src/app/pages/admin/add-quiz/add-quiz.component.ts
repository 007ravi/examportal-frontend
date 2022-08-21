import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
categories:any;
quizData={
  title:'',
  description:'',
  maxMarks: '',
numberofQues: '',
active: true,
category:{
  cid:''
}
}
  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _quizService:QuizService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(data);
    },
    (error)=>{
      Swal.fire("Error!!","Error in loading Categories",'error');
    })
  }

  addQuiz(){
    if(this.quizData.title.trim()==''||this.quizData.title==null){
this._snack.open('Title  required!!','',{
  duration:3000,
})
return;
    }

    this._quizService.addQuiz(this.quizData).subscribe((data:any)=>{
      Swal.fire("Success !!",'Quiz added','success');
      this.quizData={
        title:'',
        description:'',
        maxMarks: '',
      numberofQues: '',
      active: true,
      category:{
        cid:''
      }
      }
    },
    (err)=>{
      Swal.fire("Error !!",'Server Error','error');
    })
  }

}
