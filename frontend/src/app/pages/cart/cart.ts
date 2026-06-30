import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems = [
    {
      title: 'Velozes & Furiosos 12',
      session: 'Hoje, 19:00',
      room: 'Sala 3',
      seats: ['F5', 'F6'],
      tickets: '2 ingressos',
      price: 94.8
    },
    {
      title: 'Como Treinar o Seu Dragao',
      session: 'Sabado, 16:30',
      room: 'Sala 1',
      seats: ['D8'],
      tickets: '1 ingresso',
      price: 47.4
    }
  ];

  constructor(private router: Router) {}

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  finalizarPedido() {
    this.router.navigate(['/payment']);
  }
}
