import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProduct, Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() onAddToCart: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();
  quantity: number = 1;

  private router = inject(Router);

  public navigateToProductItem(id: number) {
    this.router.navigate(['/products/', id]);
  }

  addToCart() {
    const cartProduct = {
      ...this.product,
      quantity: this.quantity
    } as CartProduct;
    this.onAddToCart.emit(cartProduct);
  }

}
