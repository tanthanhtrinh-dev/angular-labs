import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string='';
  products!: Product[];
  selectedProduct!: Product|null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.selectProductChanges$.subscribe(selectedProduct=>{
       this.selectedProduct =selectedProduct;
    });

    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSelected(product: Product): void {
    //this.productService.currentProduct = product;
    this.productService.changeSelectedProduct(product);
  }

}
