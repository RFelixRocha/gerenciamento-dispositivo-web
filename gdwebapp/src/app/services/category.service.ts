import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Category } from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'http://18.230.117.21:3000/api/v1/categories';

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  constructor(private http: HttpClient) {

  }

  /**
   * Add category
   * */
  addCategory(category: Category): Observable<Category>{
    const url = `${this.categoryUrl}/create`;
    return this.http.post<Category>(url,category,this.httpOptions)
    tap((newCategory: Category) => this.log(`Nova categoria cadastrada, id ${newCategory.id}`)),
      catchError(this.handleError<Category>('addCategory'))
  }

  /**  Busca todas as categorias */
  getCategories(): Observable<Category[]> {
    const url = `${this.categoryUrl}/all`;
    return this.http.get<Category[]>(url)
      .pipe(
        tap(() => this.log('fetched category')),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  /**
   * Busca uma categoria
   * **/
  searchCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/search/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        tap(() => this.log(`fetched category id ${id}`)),
        catchError(this.handleError<Category>('searchCategory'))
      );
  }

  /**
   * Deleta uma categoria
   * **/
  deleteCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/delete/${id}`;
    return this.http.delete<Category>(url,this.httpOptions)
      .pipe(
        tap(() => this.log(`Categoria com id ${id} deletada`)),
        catchError(this.handleError<Category>('deleteCategory' ))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log do Category.service */
  private log(message: string) {
    console.log(message);
  }

}
