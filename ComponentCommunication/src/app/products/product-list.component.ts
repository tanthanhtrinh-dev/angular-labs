import { ProductParameterService } from './product-parameter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[ProductService]
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  //showImage = false; use product service to get property
  errorMessage = '';
  includeDetail: boolean = true;
  parentListFilter: string="";

  @ViewChild(CriteriaComponent) filterComponent!: CriteriaComponent;
  
  // _listFilter = '';
  // get listFilter(): string {
  //   return this.productParameterService.filterBy;
  // }
  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  // }

  get showImage():boolean{
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean){
    this.productParameterService.showImage = value;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private productParameterService: ProductParameterService
  ) {

    //console.log('products constructor');
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: Product) =>  product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  // Checks both the product name and tags
  performFilter2(filterBy: string): Product[] {

    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: Product) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 || 
      (product.tags && product.tags.some((tag) => tag.toLocaleLowerCase().indexOf(filterBy) !== -1 ))
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onValueChange(value: string): void {
    //console.log(value);
    this.productParameterService.filterBy = value;
    //this.listFilter = this.productParameterService.filterBy;
    //this.performFilter2(value);
    this.filteredProducts = value ? this.performFilter2(value) : this.products;
  }

  ngOnInit(): void {
    console.log('ngOnInit');

    //this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    //this.listFilter = this.productParameterService.filterBy;

    //this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    this.productService.getProducts().subscribe({
      next: (products) => {
        //console.log('error');
        this.products = products;
        //this.filteredProducts = this.products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
        //this.performFilter('');
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err);},
    });
  }
}
