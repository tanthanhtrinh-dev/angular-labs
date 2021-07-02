import { find, first } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  errorMessage: string = '';
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    //this.pageTitle = this.pageTitle +' #' + id;
    this.pageTitle += `: ${id}`;
    // this.product =  {
    //   "productId": 2,
    //   "productName": "Garden Cart",
    //   "productCode": "GDN-0023",
    //   "releaseDate": "March 18, 2021",
    //   "description": "15 gallon capacity rolling garden cart",
    //   "price": 32.99,
    //   "starRating": 4.2,
    //   "imageUrl": "assets/images/garden_cart.png"
    // };

    //let product = this.productService.getProducts();

    // this.sub = this.productService.getProductById(Number(id)).subscribe({
    //   next: (proItems) => {
    //     this.product = proItems;
    //   },
    //   error: (err) => (this.errorMessage = err),
    // });

    this.sub = this.productService.getProducts().subscribe({
      next: (proItems) => {
        this.product = proItems.find((f) => f.productId === Number(id));
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
