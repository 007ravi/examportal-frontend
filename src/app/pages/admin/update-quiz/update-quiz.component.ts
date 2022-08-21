import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private router:Router, private _route:ActivatedRoute,private _quizService:QuizService,private _category:CategoryService) { }

  qId=0;
  quizData:any;
  categories:any;


  ngOnInit(): void {
 this.qId=this._route.snapshot.params.qid;
 console.log(this.qId);
 this._quizService.getSingleQuiz(this.qId).subscribe((data:any)=>{
this.quizData=data;
console.log(this.quizData);
 },
 (err)=>{
  Swal.fire("Error","Error in Update Quiz ",'error');
 });
 this._category.categories().subscribe((data:any)=>{
  this.categories=data;
  console.log(data);
},
(error)=>{
  Swal.fire("Error!!","Error in loading Categories",'error');
})
  }

  updateQuiz(){
    this._quizService.updateQuiz(this.quizData).subscribe((data:any)=>{
      Swal.fire("Success","Quiz Updated",'success').then((e)=>{
        this.router.navigate(['/admin/quizzes']);
      });
    },(err:any)=>{
      Swal.fire("Error!!","Error  in update Quiz",'error');
    })
  }
}
