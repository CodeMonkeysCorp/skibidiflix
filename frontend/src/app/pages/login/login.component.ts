import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login() {
    // console.log(this.email, this.password);
    this.http.post('http://localhost:8080/auth/login', {
      email: this.email,
      password: this.password
    }, { responseType: 'text' })
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}