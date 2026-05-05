import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    // console.log(this.email, this.password);
    this.http.post<{ success: boolean; message: string }>(
      'http://localhost:8080/auth/register',
      {
        email: this.email,
        password: this.password
      }
  )
  .subscribe({
    next: (res) => {
      if (res.success) {
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
