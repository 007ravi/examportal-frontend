import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  deleteCategory(id: any) {
    return this._http.delete(`${baseUrl}/category/`+id);
  }

  constructor(private _http:HttpClient) { }
    //load all te categories
    public categories(){
return this._http.get(`${baseUrl}/category/`);
  }


//add new category
public addCategory(category:any){
return this._http.post(`${baseUrl}/category/`,category);
}
}
