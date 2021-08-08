import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'pm-product-shell-list',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.scss']
})
export class ProductShellComponent implements OnInit {
  monthCount: number=0;
  constructor(private productServicce: ProductService) { }

  ngOnInit(): void {
    this.productServicce.selectProductChanges$.subscribe(selectedProduct=>{

      if(selectedProduct){
        const start = new Date(selectedProduct.releaseDate);
        const now = new Date();
        this.monthCount = now.getMonth() - start.getMonth() + (12 *(now.getFullYear()-start.getFullYear()));
      }else{
        this.monthCount = 0;
      }

    });
  }

}
