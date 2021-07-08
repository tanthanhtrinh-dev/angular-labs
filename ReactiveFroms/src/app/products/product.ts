/* Defines the product entity */
export interface Product {
  id: number | any;
  productName: string;
  productCode: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

