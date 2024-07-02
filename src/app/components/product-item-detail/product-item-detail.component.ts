import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css'
})
export class ProductItemDetailComponent {
  product: Product | undefined;
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getProductById(id).subscribe(product => this.product = product);
    });
  }

  private router = inject(Router);

  public navigateToProductList() {
    this.router.navigate(['']);
  }
  addToCart() {
    if(this.product) {
      const cartProduct = {
        ...this.product,
        quantity: this.quantity
      }
      this.cartService.addToCart(cartProduct);
    }
  }
}
