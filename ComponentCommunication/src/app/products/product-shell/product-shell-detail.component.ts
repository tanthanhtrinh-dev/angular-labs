import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
//import { timer } from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';

    // get product(): Product | null {
    //     return this.productService.currentProduct;
    // }
    product!: Product|null;
    constructor(private productService: ProductService) { 

    }
    ngOnInit() {
        //timer(0,1000).subscribe(t=> console.log(this.product));   
        this.productService.selectProductChanges$.subscribe(
            selectProduct=>this.product=selectProduct
        );    
    }

}
