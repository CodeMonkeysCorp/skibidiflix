import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TicketLine {
  key: string;
  label: string;
  price: number;
  count: number;
}

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  paymentMethod: string = 'credit';
  movieTitle: string = 'Velozes & Furiosos 12';
  sessionDate: string = 'Hoje - 19:00';
  movieId: string | null = null;
  rawSessionDate: string | null = null;
  seats: string[] = ['F5', 'F6'];
  ticketLines: TicketLine[] = [
    { key: 'inteira', label: 'Inteira', price: 47.4, count: 2 }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    const params = this.route.snapshot.queryParamMap;
    const seatsParam = params.get('seats');
    const dataParam = params.get('data');
    const ticketsParam = params.get('tickets');
    const movieParam = params.get('movie');
    this.movieId = params.get('id_filme') || params.get('id');

    if (movieParam) {
      this.movieTitle = movieParam;
    }

    if (seatsParam) {
      this.seats = seatsParam.split(',').filter(Boolean);
    }

    if (dataParam) {
      this.rawSessionDate = dataParam;
      this.sessionDate = `${dataParam} - 19:00`;
    }

    if (ticketsParam) {
      this.ticketLines = this.parseTicketLines(ticketsParam);
    } else if (this.seats.length > 0) {
      this.ticketLines = [
        { key: 'inteira', label: 'Inteira', price: 47.4, count: this.seats.length }
      ];
    }
  }

  get totalItems(): number {
    return this.ticketLines.reduce((sum, ticket) => sum + ticket.count, 0);
  }

  get total(): number {
    return this.ticketLines.reduce((sum, ticket) => sum + (ticket.price * ticket.count), 0);
  }

  finalizarCompra() {
    this.confirmOccupiedSeats();
    this.router.navigate(['/my-orders']);
  }

  private parseTicketLines(value: string): TicketLine[] {
    try {
      const parsed = JSON.parse(value) as TicketLine[];
      return parsed
        .filter(ticket => Number(ticket.count) > 0)
        .map(ticket => ({
          key: ticket.key,
          label: ticket.label || ticket.key,
          price: Number(ticket.price) || 0,
          count: Number(ticket.count) || 0
        }));
    } catch {
      return [];
    }
  }

  private confirmOccupiedSeats() {
    if (this.seats.length === 0) return;

    const storageKey = this.getOccupiedSeatsStorageKey();
    const occupiedSeats = this.readStoredSeats(storageKey);
    const confirmedSeats = Array.from(new Set([...occupiedSeats, ...this.seats]));
    localStorage.setItem(storageKey, JSON.stringify(confirmedSeats));
  }

  private readStoredSeats(storageKey: string): string[] {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  }

  private getOccupiedSeatsStorageKey(): string {
    const movieId = this.movieId || 'default';
    const sessionDate = this.rawSessionDate || 'default';
    return `occupiedSeats:${movieId}:${sessionDate}:sala-3:19-00`;
  }
}
