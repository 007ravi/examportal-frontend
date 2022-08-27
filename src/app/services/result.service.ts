import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private _http:HttpClient) { }

  addResultByUserAndQuiz(result:any){
    return this._http.post(`${baseUrl}/result/`,result);
  }

  getAllResult(){
    return this._http.get(`${baseUrl}/result/`);
  }

  getResultByQuiz(quizId:Number){
    return this._http.get(`${baseUrl}/result/quiz/${quizId}`);
  }

  getResultByUser(username:String){
    return this._http.get(`${baseUrl}/result/user/${username}`);
  }
}
