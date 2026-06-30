import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Adicione o ChangeDetectorRef aqui
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment implements OnInit {
  idFatura: string | null = null;
  fatura: any = null;
  carregando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.carregando = true;
        this.fatura = null;
        this.idFatura = params.get('id_fatura');

        if (this.idFatura) {
          this.http.get<any>(`http://localhost:8080/api/faturas/${this.idFatura}`).subscribe({
            next: (dados) => {
              console.log("Novos dados recebidos do Java:", dados);
              
              this.fatura = dados;
              this.carregando = false;

              // 3. O TRUQUE MÁGICO: Força o Angular a atualizar o HTML imediatamente!
              this.cdr.detectChanges(); 
            },
            error: (err) => {
              console.error("Erro ao buscar nova fatura:", err);
              this.fatura = null;
              this.carregando = false;
              this.cdr.detectChanges(); // Força o HTML a mostrar a tela de erro
            }
          });
        } else {
          this.carregando = false;
          this.cdr.detectChanges();
        }
      }
    });
  }

  finalizarCompra() {
    alert('Compra finalizada com sucesso!');
    this.router.navigate(['/my-orders']);
  }
}