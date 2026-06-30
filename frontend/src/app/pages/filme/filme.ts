import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';

import { Movie } from '../../interfaces/movie';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs';

@Component({
  selector: 'app-filme',
  imports: [CommonModule, FormsModule],
  templateUrl: './filme.html',
  styleUrl: './filme.css',
})
export class Filme {

  movie$!: Observable<Movie>;
  activeTab: string = 'sessoes';
  descricaoExpandida: boolean = false;
  datasSessoes: string[] = this.gerarDatasSessoes();
  reminderModalAberto: boolean = false;
  reminderDate: string = '';
  reminderMessage: string = '';
  toastMessage: string = '';
  private toastTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id_filme = params.get('id');

      if (id_filme) {
        this.movie$ = this.movieService.getMovieById(id_filme);
        this.descricaoExpandida = false;
        this.reminderModalAberto = false;
        this.reminderMessage = '';
      }
    });
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

  abrirReminderModal(): void {
    this.reminderMessage = '';
    this.reminderDate = this.reminderDate || this.getHojeInputDate();
    this.reminderModalAberto = true;
  }

  fecharReminderModal(): void {
    this.reminderModalAberto = false;
  }

  salvarLembrete(movie: Movie): void {
    const email = localStorage.getItem('loggedUserEmail');

    if (!email) {
      this.reminderMessage = 'Faça login para receber o lembrete por email.';
      return;
    }

    if (!this.reminderDate) {
      this.reminderMessage = 'Selecione uma data para o lembrete.';
      return;
    }

    this.http.post<{ success: boolean; message: string }>(
      'http://localhost:8080/reminders',
      {
        email,
        movieId: movie.id_filme,
        movieName: movie.nm_filme,
        reminderDate: this.reminderDate,
        movieUrl: window.location.href
      }
    ).subscribe({
      next: (res) => {
        this.reminderMessage = res.message;
        if (res.success) {
          this.reminderModalAberto = false;
          this.showToast('Lembrete enviado para seu email!');
        }
      },
      error: () => {
        this.reminderMessage = 'Não foi possível enviar o lembrete agora.';
      }
    });
  }

  compartilhar(): void {
    const link = window.location.href;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        this.showToast('Link copiado!');
      }).catch(() => {
        this.copyWithFallback(link);
      });
      return;
    }

    this.copyWithFallback(link);
  }

  goToSessionMap(data: string): void {
    const movie$ = this.movie$;
    movie$.pipe(take(1)).subscribe(movie => {
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

  private showToast(message: string): void {
    this.toastMessage = message;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
    }, 2500);
  }

  private copyWithFallback(link: string): void {
    const input = document.createElement('textarea');
    input.value = link;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    this.showToast('Link copiado!');
  }

  private getHojeInputDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
