import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  activeTab: string = 'sessoes';
  descricaoExpandida: boolean = false;
  datasSessoes: string[] = this.gerarDatasSessoes();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id_filme = this.route.snapshot.queryParamMap.get('id');

    this.movie$ = this.movieService.getMovieById(id_filme!);

  }

  gerarDatasSessoes(): string[] {
    const dias = ['HOJE', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM', 'SEG'];
    const datas = [];
    const hoje = new Date();
    
    for (let i = 0; i < 7; i++) {
      const data = new Date(hoje);
      data.setDate(data.getDate() + i);
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      datas.push(`${dias[i]}\n${dia}/${mes}`);
    }
    
    return datas;
  }

  toggleDescricao(): void {
    this.descricaoExpandida = !this.descricaoExpandida;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  goToSessionMap(data: string): void {
    const movie$ = this.movie$;
    movie$.subscribe(movie => {
      this.router.navigate(['/session-map'], { 
        queryParams: { 
          id_filme: movie.id_filme,
          data: data
        } 
      });
    });
  }

  formatarDuracao(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h${mins.toString().padStart(2, '0')}`;
  }
}