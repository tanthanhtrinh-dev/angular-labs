import { Component, OnInit } from '@angular/core';
//define class
@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
})
//define component
export class ProductListComponent implements OnInit {

  pageTitle: string = 'Product List';
  showImage: boolean = true;
  imageWidth: number = 50;
  imageMargin: number = 2;
  listFilter: string = 'cart';
  products: any[] = [
    {
      productId: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2021',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/garden_cart.png',
    },
    {
      productId: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2021',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl: 'assets/images/hammer.png',
    },
  ];
  catids: any[] = [];
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    console.log("in OnInit");
  }
}
