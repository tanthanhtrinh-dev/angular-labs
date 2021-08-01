import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage:string;
  product: Product;

  constructor(private route: ActivatedRoute) //private router: Router,
  //private productService: ProductService
  {}

  ngOnInit(): void {
    // const param = this.route.snapshot.paramMap.get('id');
    // if (param) {
    //   const id = +param;
    //   this.getProduct(id);
    // }
    const resolvedData: ProductResolved = this.route.snapshot.data['resolvedData'];
    //console.log(resolvedData);
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }
  onProductRetrieved(product: Product): void {
    this.product = product;
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.product = product,
  //     error: err => this.errorMessage = err
  //   });
  // }
  // onBack(): void {
  //   this.router.navigate(['/products']);
  // }
}
