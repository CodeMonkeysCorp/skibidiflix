import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // console.log(this.email, this.password);
    this.http.post<{ success: boolean; message: string }>(
      'http://localhost:8080/auth/login',
      {
        email: this.email,
        password: this.password
      }
  )
  .subscribe({
    next: (res) => {
      if (res.success) {
        localStorage.setItem('loggedUserEmail', this.email);
        this.router.navigate(['/home']);
      } else {
        alert(res.message);
      }
    },
    error: (err) => {
      console.error(err);
    }
  });
  }
}
