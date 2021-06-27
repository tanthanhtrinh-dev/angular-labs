import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root', //injection anywhere in the application
})
export class ProductService {
  private _productUrl: string = 'api/products/products.json';

  constructor(private http: HttpClient) {}
  // Basic get product
  //   getProducts(): Observable<IProduct[]> {
  //     return this.http.get<IProduct[]>(this._productUrl);
  //   }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this._productUrl).pipe(
      tap((data) => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
