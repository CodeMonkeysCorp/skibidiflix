import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-session-map',
  imports: [CommonModule],
  templateUrl: './session-map.html',
  styleUrl: './session-map.css',
})
export class SessionMap {

  movie: Movie | null = null;
  id_filme: string | null = null;
  dataSessao: string | null = null;

  // seats grid
  rows = 16;
  cols = 12;
  seats: Array<{ id: string; row: number; num: number; status: 'available' | 'occupied' | 'selected' }>= [];
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
        // mark some seats as occupied for demo
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
    t.count = Math.max(0, t.count + delta);
    // optional: auto-advance when counts match seats
    const totalTickets = this.ticketTypes.reduce((s, it) => s + it.count, 0);
    if (totalTickets === this.selectedSeats.length && totalTickets > 0) {
      // counts match selected seats -> proceed automatically
      this.goToPayment();
    }
  }

  goToPayment() {
    const totalTickets = this.ticketTypes.reduce((s, it) => s + it.count, 0);
    if (totalTickets === 0) return; // nothing selected
    if (totalTickets !== this.selectedSeats.length) {
      // prevent navigation if counts don't match seats
      alert('A contagem de ingressos precisa ser igual à quantidade de assentos selecionados.');
      return;
    }

    const seatsParam = this.selectedSeats.join(',');
    const ticketsParam = JSON.stringify(this.ticketTypes.map(t => ({ key: t.key, count: t.count })) );
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

  getRowLetter(index: number): string {
    const seatsPerRow = 12;
    const rowIndex = Math.floor(index / seatsPerRow);
    
    return String.fromCharCode(65 + rowIndex);
  }

}
