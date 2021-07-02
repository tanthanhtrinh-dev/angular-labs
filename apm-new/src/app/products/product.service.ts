import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, first, find } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root', //injection anywhere in the application
})
export class ProductService {
  private _productUrl: string = 'api/products/products.json';
  private _productDetailUrl: string = 'api/products/product.json';

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

  getProductById(id: number): Observable<IProduct>{
    //console.log("id",id);
    return this.http.get<IProduct>(this._productDetailUrl).pipe(
      //tap((data) => data.productId === id),      
      //find(f:IProduct => f.productId === id),
      //first(f=> f.productId === id),
      tap(_ => console.log(`fetched hero id=${id}`)),
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
