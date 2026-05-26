import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';

import { Movie } from '../../interfaces/movie';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-filme',
  imports: [CommonModule],
  templateUrl: './filme.html',
  styleUrl: './filme.css',
})
export class Filme {

  movie$!: Observable<Movie>;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {

    const id_filme = this.route.snapshot.queryParamMap.get('id');

    this.movie$ = this.movieService.getMovieById(id_filme!);

  }
}