import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';

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

  // seats grid
  rows = 16;
  cols = 12;
  seats: Array<{ id: string; row: number; num: number; status: 'available' | 'occupied' | 'selected' }> = [];
  selectedSeats: string[] = [];

  // tickets step
  step: 'seats' | 'tickets' = 'seats';
  ticketTypes = [
    { key: 'inteira', label: 'Inteira', price: 47.4, count: 0 },
    { key: 'meia', label: 'Meia', price: 23.7, count: 0 }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    this.buildSeats();
  }

  ngOnInit(): void {
    this.id_filme = this.route.snapshot.queryParamMap.get('id_filme') || this.route.snapshot.queryParamMap.get('id');
    this.dataSessao = this.route.snapshot.queryParamMap.get('data');

    if (this.id_filme) {
      this.movieService.getMovieById(this.id_filme).subscribe(m => this.movie = m);
    }
  }

  buildSeats() {
    for (let r = this.rows; r >= 1; r--) {
      for (let c = 1; c <= this.cols; c++) {
        const id = `R${r}C${c}`;
        const occupied = Math.random() < 0.08; // ~8% occupied
        this.seats.push({ id, row: r, num: c, status: occupied ? 'occupied' : 'available' });
      }
    }
  }

  toggleSeat(seat: { id: string; status: string }) {
    if (seat.status === 'occupied') return;
    if (this.selectedSeats.includes(seat.id)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat.id);
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
    const t = this.ticketTypes.find(x => x.key === typeKey);
    if (!t) return;
    
    // Altera a quantidade garantindo que nunca fique menor que 0
    t.count = Math.max(0, t.count + delta);
  }

  goToPayment() {
    if (this.totalItems === 0) return;
    if (this.totalItems !== this.selectedSeats.length) {
      alert('A contagem de ingressos precisa ser igual à quantidade de assentos selecionados.');
      return;
    }

    const seatsParam = this.selectedSeats.join(',');
    const ticketsParam = JSON.stringify(this.ticketTypes.map(t => ({ key: t.key, count: t.count })));
    this.router.navigate(['/payment'], { queryParams: {
      id_filme: this.id_filme,
      data: this.dataSessao,
      seats: seatsParam,
      tickets: ticketsParam
    }});
  }

  backToSeats() {
    this.step = 'seats';
  }

  // Getters para limpar a lógica do HTML e evitar erros de escopo (t)
  get totalItems(): number {
    return this.ticketTypes.reduce((s, it) => s + it.count, 0);
  }

  get totalPrice(): number {
    return this.ticketTypes.reduce((s, it) => s + (it.count * it.price), 0);
  }

  getRowLetter(index: number): string {
    const totalRows = Math.ceil(this.seats.length / this.cols);
    const rowIndex = Math.floor(index / this.cols);
    
    // Inverte a ordem para que a fileira mais próxima da tela mude adequadamente
    const invertedRowIndex = (totalRows - 1) - rowIndex;
    return String.fromCharCode(65 + invertedRowIndex);
  }
}