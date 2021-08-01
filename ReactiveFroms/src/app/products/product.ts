/* Defines the product entity */
export interface Product {
  id: number | any;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export interface ProductResolved {
  product: Product | any;
  error?: string | any;
}
