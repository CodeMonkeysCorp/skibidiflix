import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
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
}
