import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Movie } from './interfaces/movie';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  searchTerm: string = '';
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  isSearchOpen: boolean = false;

  constructor(
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  atualizarSugestoes(): void {
    const busca = this.searchTerm.trim().toLowerCase();

    if (!busca) {
      this.filteredMovies = [];
      this.isSearchOpen = false;
      return;
    }

    this.filteredMovies = this.movies
      .filter(movie => movie.nm_filme.toLowerCase().includes(busca))
      .slice(0, 6);
    this.isSearchOpen = true;
  }

  buscarFilmes(): void {
    if (this.filteredMovies.length > 0) {
      this.irParaFilme(this.filteredMovies[0]);
      return;
    }

    this.atualizarSugestoes();
  }

  abrirSugestoes(): void {
    this.atualizarSugestoes();
  }

  fecharSugestoes(): void {
    setTimeout(() => {
      this.isSearchOpen = false;
    }, 120);
  }

  irParaFilme(movie: Movie): void {
    this.searchTerm = movie.nm_filme;
    this.isSearchOpen = false;
    this.router.navigate(['/filme'], {
      queryParams: { id: movie.id_filme }
    });
  }
}
