export interface Product {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
}

export interface CartProduct extends Product {
  quantity: number;
}
