import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmInformationComponent } from './confirm-information/confirm-information.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'products/:id', component: ProductItemDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'confirm', component: ConfirmInformationComponent },

];


