import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {
  orders = [
    {
      code: 'SKB-2048',
      status: 'Confirmado',
      title: 'Velozes & Furiosos 12',
      date: 'Hoje, 19:00',
      room: 'Sala 3',
      seats: 'F5, F6',
      payment: 'Cartao de credito',
      total: 94.8
    },
    {
      code: 'SKB-2031',
      status: 'Finalizado',
      title: 'Como Treinar o Seu Dragao',
      date: 'Sabado, 16:30',
      room: 'Sala 1',
      seats: 'D8',
      payment: 'Pix',
      total: 47.4
    }
  ];
}
