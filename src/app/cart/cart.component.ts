import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartProduct } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmInformationComponent } from "../confirm-information/confirm-information.component";

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [CommonModule, CartComponent, FormsModule, ReactiveFormsModule, ConfirmInformationComponent]
})

export class CartComponent {
  cartProducts: CartProduct[] = [];
  private router = inject(Router);
  totalPrice: number = 0;
  isConfirmationVisible = false;

  public navigateToCart() {
    this.router.navigate(['/cart']);
  }


  paymentForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    creditNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
    address: new FormControl('', Validators.required)
  });

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe(
      {
        next: (cartProducts) => {
          this.cartProducts = cartProducts;
        }
      }
    );
  }

  updateProduct(cartProduct: CartProduct) {
    this.cartService.addToCart(cartProduct);
    console.log(cartProduct);
  }

  removeFromCart(cartProduct: CartProduct) {
    this.cartService.removeCartItem(cartProduct);
  }

  getTotalPrice(): number {
    return this.cartProducts.reduce((acc, cartProduct) => acc + cartProduct.price * cartProduct.quantity, 0);
  }

  submitOrder() {
    if (this.paymentForm.valid) {
      this.totalPrice = this.cartService.getTotalPrice();
      this.isConfirmationVisible = true;
      this.cartService.clearCart();
      // this.router.navigate(['/confirm']);
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  get name() {
    return this.paymentForm.get('name');
  }

  get address() {
    return this.paymentForm.get('address');
  }

  get creditNumber() {
    return this.paymentForm.get('creditNumber');
  }
}

