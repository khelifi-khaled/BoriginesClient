import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver {
  
  constructor(
    private readonly _categoryService: CategoryService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this._categoryService.getAll();
  }
}
