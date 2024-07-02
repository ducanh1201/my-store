import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-information.component.html',
  styleUrl: './confirm-information.component.css'
})
export class ConfirmInformationComponent {
  @Input() isVisible: boolean = true;
  @Input() name: string = "";
  @Input() totalAmount: number = 0;

  private router = inject(Router);

  public navigateToProductList() {
    this.router.navigate(['']);
  }
}
