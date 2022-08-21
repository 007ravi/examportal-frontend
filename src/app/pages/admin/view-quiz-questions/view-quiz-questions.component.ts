import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any;
  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;//variable given in router module
    this.qTitle=this._route.snapshot.params.title;
    this._question.getQuestionOfQuiz(this.qId).subscribe((data)=>{
      this.questions=data;
      console.log(data);
    },
    (err)=>{
      console.log(err);
    })
  }

  deleteQuestion(quesId:any){
console.log(quesId);

Swal.fire({
  icon:'info',
  showCancelButton:true,
  confirmButtonText:'Delete',
  title:'Are you sure, want to delete this question?'
  }
).then((result)=>{
  if(result.isConfirmed){
    this._question.deleteQuestion(quesId).subscribe(
      (data)=>{
        this._snack.open('Question Deleted!!','', {
          duration:3000,
        });
        this.questions=this.questions.filter((q:any)=>q.quesId!=quesId)
      },
      (err)=>{
        this._snack.open('Error in deleting question','',{
          duration:3000,
        });
        console.log(err);
      }
    )
  }
})
  }

  updateQuestion(quesId:any){
    
  }

}
