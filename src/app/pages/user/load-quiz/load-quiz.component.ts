import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _quizService:QuizService,private _snack:MatSnackBar) { }

  catid:any;
  quizData:any;
  ngOnInit(): void {
this.catid=this._route.snapshot.params.catId;
this._route.params.subscribe((param:any)=>{
this.catid=param.catId;
if(this.catid=='all')
{
  //load all quiz
  console.log('load all quiz');
//   this._quizService.getQuizzes().subscribe((data:any)=>{
// this.quizData=data;
// console.log(this.quizData);
//   },
//   (err)=>{

//   })


//load active quizzes only
  this._quizService.getActiveQuizzes().subscribe((data:any)=>{
this.quizData=data;
console.log(this.quizData);
  },
  (err)=>{

  })
}
else{
  //load quiz of selected category
//   console.log(this.catid);
//   this.quizData=[];
//   this._quizService.getQuizzesOfCategory(this.catid).subscribe((data:any)=>{
// this.quizData=data;
//   },
//   (err:any)=>{
//     this._snack.open("Error in loading categories from server",'',{
//       duration:3000,
//     });
//   })
  

//load ACTIVE QUIZZES OF CATEGORY
console.log(this.catid);
this.quizData=[];
this._quizService.getActiveQuizzesOfCategory(this.catid).subscribe((data:any)=>{
this.quizData=data;
},
(err:any)=>{
  this._snack.open("Error in loading categories from server",'',{
    duration:3000,
  });
})
}
})

  }

}
