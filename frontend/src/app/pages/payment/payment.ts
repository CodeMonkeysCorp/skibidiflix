import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  constructor(private router: Router) {}

  finalizarCompra() {
    this.router.navigate(['/my-orders']);
  }
}
