import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(private router: Router) {}

  finalizarPedido() {
    this.router.navigate(['/payment']);
  }
}