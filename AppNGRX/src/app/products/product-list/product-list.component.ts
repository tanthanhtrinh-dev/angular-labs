import { getError } from './../state/product.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { getShowProductCode, getCurrentProduct, State, getProducts } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage$!: Observable<string|null>;
  sub!: Subscription;
  products$!: Observable<Product[]>;
  selectedProduct$!: Observable<Product|null>;
  displayCode$!: Observable<boolean>;

  constructor(private productService: ProductService, private store: Store<State>) { }

  ngOnInit(): void {

    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct!
    // );


    this.products$ = this.store.select(getProducts)
    this.errorMessage$=this.store.select(getError);
    //I want to get products
    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });
    
    //TODO: Unsubscribe
    // this.store.select('products').subscribe(products=>{
    //   if(products){
    //       this.displayCode = products.showProductCode;
    //   }
    // });
    // this.store.select(getShowProductCode).subscribe(showProductCode=>{      
    //       this.displayCode = showProductCode;      
    // });

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
  }

  checkChanged(): void {
    //this.displayCode = !this.displayCode;
    //this.store.dispatch({type: '[Product] Toggle Product Code'});
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    //this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    //this.productService.changeSelectedProduct(product);
    //console.log(product);
    this.store.dispatch(ProductActions.setCurrentProduct({product: product}));
  }

}
