import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  movies$: Observable<Movie[]>;
  featuredMovie$: Observable<Movie>;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {

    this.movies$ = combineLatest([
      this.movieService.getMovies(),
      this.route.queryParamMap
    ]).pipe(
      map(([movies, params]) => {
        const busca = (params.get('busca') || '').trim().toLowerCase();

        if (!busca) {
          return movies;
        }

        return movies.filter(movie => movie.nm_filme.toLowerCase().includes(busca));
      })
    );

    this.featuredMovie$ = this.movieService.getMovies().pipe(

      map(movies => {

        const randomIndex = Math.floor(Math.random() * movies.length);

        return movies[randomIndex];

      })

    );

  }

}
