import { ProductService } from './product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { Subscription } from 'rxjs';
//define class
@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  //define inject productService
  providers: [ProductService],
})
//define component
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  showImage: boolean = true;
  imageWidth: number = 50;
  imageMargin: number = 2;
  //listFilter: string = 'cart';
  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('in setter', value);
    this.filteredProducts = this.performFilter(value);
  }
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  errorMessage: string = '';
  //option 1 to define=> set to be undefined
  //sub: Subscription | undefined;
  //option 2 this property sometime later
  sub!: Subscription;

  //Option 1 standard
  // private _productService: ProductService;
  // constructor(productService: ProductService) {
  //   this._productService = productService;
  // }

  //option 2
  constructor(private _productService: ProductService) {}
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.sub.unsubscribe();
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((x: IProduct) =>
      x.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  //toggleImage1()=> {this.showImage = !this.showImage};
  onRatingCliecked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    console.log('in OnInit');
    //this._listFilter = 'cart';
    this.sub = this._productService.getProducts().subscribe({
      next: (proItems) => {
        this.products = proItems;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
    //this.products =this.productService.getProducts();
    //this.filteredProducts = this.products;
  }
}
