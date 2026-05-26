import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  movies$: Observable<Movie[]>;
  featuredMovie$: Observable<Movie>;

  constructor(private movieService: MovieService) {

    this.movies$ = this.movieService.getMovies();

    this.featuredMovie$ = this.movieService.getMovies().pipe(

      map(movies => {

        const randomIndex = Math.floor(Math.random() * movies.length);

        return movies[randomIndex];

      })

    );

  }

}