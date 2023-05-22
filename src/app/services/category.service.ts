import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getAll(): Observable<Category[]>{
    return this._httpClient.get<Category[]>(environment.baseApi + 'Category/GetCategories', { reportProgress: true });
  }
}
