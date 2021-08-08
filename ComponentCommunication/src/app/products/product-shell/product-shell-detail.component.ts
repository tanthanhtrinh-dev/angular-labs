import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Subscription } from 'rxjs';
//import { timer, Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    // get product(): Product | null {
    //     return this.productService.currentProduct;
    // }
    product!: Product | null;
    sub!: Subscription;

    constructor(private productService: ProductService) { 

    }
    
    ngOnInit() {
        //timer(0,1000).subscribe(t=> console.log(this.product));   
        this.sub = this.productService.selectProductChanges$.subscribe(
            selectProduct=>this.product=selectProduct
        );    
    }

    ngOnDestroy():void{
        this.sub.unsubscribe();
    }
}
