import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Adicionei o Router aqui para te ajudar no redirecionamento final
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
  carregando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idFatura = this.route.snapshot.queryParamMap.get('id_fatura');
    console.log("ID da Fatura capturado na URL:", this.idFatura);

    if (this.idFatura) {
      this.http.get<any>(`http://localhost:8080/api/faturas/${this.idFatura}`).subscribe({
        next: (dados) => {
          console.log("DADOS REAIS QUE CHEGARAM DO JAVA:", dados)
          this.fatura = dados;
          this.carregando = false;
        },
        error: (err) => {
          console.error("Erro ao buscar fatura:", err);
          this.carregando = false;
        }
      });
    } else {
      this.carregando = false;
    }
  }

  finalizarCompra() {
    alert('Compra finalizada com sucesso! Divirta-se no Skibidiseat!');
    
    this.router.navigate(['/']); 
  }
}