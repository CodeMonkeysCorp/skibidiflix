import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-filme',
  imports: [CommonModule],
  templateUrl: './filme.html',
  styleUrl: './filme.css',
})
export class Filme {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    const id_filme = this.route.snapshot.queryParamMap.get('id');

    console.log(id_filme);

  }
}