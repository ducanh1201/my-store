import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../../services/product.service';
import { CartProduct, Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductItemComponent,ToastrModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.products = products;
      }
    });
  }
  addToCart(cartProduct: CartProduct) {
    this.cartService.addToCart(cartProduct);
  }
}
