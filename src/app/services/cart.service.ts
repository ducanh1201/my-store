import { Inject, Injectable } from "@angular/core";
import { CartProduct } from "../models/product.model";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { DOCUMENT } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartProducts: CartProduct[] = [];
    // private cartProductsSubject = new BehaviorSubject<CartProduct[]>(this.cartProducts);
    private cartProductsSubject: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);
    public cartProducts$: Observable<CartProduct[]> = this.cartProductsSubject.asObservable();

    constructor(
        private toastr: ToastrService,
        @Inject(DOCUMENT) private document: Document) {
        this.loadInitialData();
    }


    private showAddSuccess(item: CartProduct) {
        this.toastr.success(`${item.quantity} ${item.name}`, `Added Successfully`);
    }

    private showRemoveSuccess(item: CartProduct) {
        this.toastr.success(`${item.quantity} ${item.name}`, `Removed Successfully`);
    }

    public addToCart(product: CartProduct) {
        const existingProduct = this.cartProducts.find(p => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity = product.quantity;
        } else {
            this.cartProducts.push(product);

        }
        this.cartProductsSubject.next(this.cartProducts);
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
        this.showAddSuccess(product);
    }


    private loadInitialData() {
        const cartProductsFromStorage = localStorage.getItem('cartProducts');
        const initCardProduct = cartProductsFromStorage ? JSON.parse(cartProductsFromStorage) : [];
        this.cartProductsSubject.next(initCardProduct);
    }
    private saveCart(items: CartProduct[]): void {
        localStorage.setItem('cartProducts', JSON.stringify(items));
    }

    public getCartProducts() {
        return this.cartProductsSubject.asObservable();
    }

    public removeCartItem(item: CartProduct) {
        const updatedCartProducts = this.cartProductsSubject.value.filter(cartProduct => cartProduct.id !== item.id);

        this.cartProductsSubject.next(updatedCartProducts);
        this.saveCart(updatedCartProducts);

        this.showRemoveSuccess(item);
    }

    public getTotalPrice(): number {
        return this.cartProductsSubject.value.reduce((acc, product) => acc + product.price * product.quantity, 0);
    }

    public getTotalQuantity(): number {
        return this.cartProducts.reduce((acc, product) => acc + product.quantity, 0);
    }

    public clearCart() {
        this.cartProductsSubject.next([]);
        localStorage.removeItem('cartProducts');
    }
}
