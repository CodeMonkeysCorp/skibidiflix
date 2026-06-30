import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Adicione o ChangeDetectorRef aqui
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {
  constructor(private router: Router) {}

  finalizarCompra() {
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