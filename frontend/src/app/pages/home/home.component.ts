import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {

    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });

  }
}