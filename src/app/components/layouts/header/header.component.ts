import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  private router = inject(Router);

  public navigateToCart() {
    this.router.navigate(['/cart']);
  }
  public navigateToProductList() {
    this.router.navigate(['/']);
  }
}
