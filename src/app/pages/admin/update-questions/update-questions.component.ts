import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-update-questions',
  templateUrl: './update-questions.component.html',
  styleUrls: ['./update-questions.component.css']
})
export class UpdateQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  question:any;
  constructor(
    private _route:ActivatedRoute,
    private _questionService:QuestionService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.quesId;
    this._questionService.getQuestionById(this.qId).subscribe((data:any)=>{
      this.question=data; 
      console.log(this.question);
    },(err:any)=>{
      Swal.fire("ERROR","Error in updating data",'error');
    });
//    this.question.quiz['qId']=this.qId;
  }

  formSubmit(){
    if(this.question.content.trim()=='' ||this.question.content==null){
      return;
    }
    if(this.question.option1.trim()=='' ||this.question.option1==null){
      return;
    }
    if(this.question.option2.trim()=='' ||this.question.option2==null){
      return;
    }
    if(this.question.answer.trim()=='' ||this.question.answer==null){
      return;
    }

    this._questionService.updateQuestion(this.question).subscribe((data:any)=>{
Swal.fire("Success","Question Updated",'success').then((e)=>{
  this._router.navigate(['/admin/view-questions/'+this.question.quiz.qId+'/'+this.question.quiz.title]);
});

//      this.resetQuestionInput();
    },
    (err:any)=>{
      Swal.fire("Error","Error in Updating Question",'error')
    })
  }

  resetQuestionInput(){
    this.question={
      quiz:{
        qId:this.qId
      },
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
    };
  }
}
