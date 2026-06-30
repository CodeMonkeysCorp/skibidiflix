import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';

type SeatStatus = 'available' | 'occupied' | 'selected';

interface Seat {
  id: string;
  row: number;
  num: number;
  status: SeatStatus;
}

@Component({
  selector: 'app-session-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-map.html',
  styleUrl: './session-map.css',
})
export class SessionMap implements OnInit {
  movie: Movie | null = null;
  id_filme: string | null = null;
  dataSessao: string | null = null;

  rows = 16;
  cols = 12;
  seats: Seat[] = [];
  selectedSeats: string[] = [];

  step: 'seats' | 'tickets' = 'seats';
  ticketTypes = [
    { key: 'inteira', label: 'Inteira', price: 47.4, count: 0 },
    { key: 'meia', label: 'Meia', price: 23.7, count: 0 }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.id_filme = this.route.snapshot.queryParamMap.get('id_filme') || this.route.snapshot.queryParamMap.get('id');
    this.dataSessao = this.route.snapshot.queryParamMap.get('data');
    this.buildSeats();

    if (this.id_filme) {
      this.movieService.getMovieById(this.id_filme).subscribe(m => this.movie = m);
    }
  }

  buildSeats() {
    const occupiedSeats = this.getOccupiedSeats();
    this.seats = [];

    for (let row = this.rows; row >= 1; row--) {
      for (let column = 1; column <= this.cols; column++) {
        const id = this.getSeatLabel(row, column);
        this.seats.push({
          id,
          row,
          num: column,
          status: occupiedSeats.includes(id) ? 'occupied' : 'available'
        });
      }
    }
  }

  toggleSeat(seat: Seat) {
    if (seat.status === 'occupied') return;

    if (this.selectedSeats.includes(seat.id)) {
      this.selectedSeats = this.selectedSeats.filter(selectedSeat => selectedSeat !== seat.id);
      seat.status = 'available';
    } else {
      this.selectedSeats.push(seat.id);
      seat.status = 'selected';
    }
  }

  proceedToTickets() {
    if (this.selectedSeats.length === 0) return;
    this.step = 'tickets';
  }

  changeTicketCount(typeKey: string, delta: number) {
    const ticket = this.ticketTypes.find(item => item.key === typeKey);
    if (!ticket) return;

    ticket.count = Math.max(0, ticket.count + delta);
  }

  goToPayment() {
    if (this.totalItems === 0) return;

    if (this.totalItems !== this.selectedSeats.length) {
      alert('A contagem de ingressos precisa ser igual a quantidade de assentos selecionados.');
      return;
    }

    const selectedTickets = this.ticketTypes
      .filter(ticket => ticket.count > 0)
      .map(ticket => ({
        key: ticket.key,
        label: ticket.label,
        price: ticket.price,
        count: ticket.count
      }));
    const seatsParam = this.selectedSeats.join(',');
    const ticketsParam = JSON.stringify(selectedTickets);
    const cartItem = {
      id: Date.now(),
      movieId: this.id_filme,
      title: this.movie?.nm_filme || 'Filme',
      session: `${this.dataSessao || 'Sessao'} - 19:00`,
      room: 'Sala 3',
      seats: this.selectedSeats,
      ticketLines: selectedTickets,
      price: this.totalPrice
    };
    const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    localStorage.setItem('cartItems', JSON.stringify([...currentCart, cartItem]));

    this.router.navigate(['/payment'], {
      queryParams: {
        id_filme: this.id_filme,
        data: this.dataSessao,
        seats: seatsParam,
        tickets: ticketsParam,
        movie: this.movie?.nm_filme
      }
    });
  }

  backToSeats() {
    this.step = 'seats';
  }

  get totalItems(): number {
    return this.ticketTypes.reduce((sum, ticket) => sum + ticket.count, 0);
  }

  get totalPrice(): number {
    return this.ticketTypes.reduce((sum, ticket) => sum + (ticket.count * ticket.price), 0);
  }

  getSeatGridColumn(column: number): number {
    if (column <= 3) return column;
    if (column <= 9) return column + 1;
    return column + 2;
  }

  private getSeatLabel(row: number, column: number): string {
    return `${String.fromCharCode(64 + row)}${column}`;
  }

  private getOccupiedSeats(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.getOccupiedSeatsStorageKey()) || '[]');
    } catch {
      return [];
    }
  }

  private getOccupiedSeatsStorageKey(): string {
    const movieId = this.id_filme || 'default';
    const sessionDate = this.dataSessao || 'default';
    return `occupiedSeats:${movieId}:${sessionDate}:sala-3:19-00`;
  }
}
