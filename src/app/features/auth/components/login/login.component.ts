import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  model = {
    username: '',
    password: '',
  };
  submitted = false;
  loading = false;
  error = '';

  @ViewChild('actorForm')
  actorForm!: NgForm;

  constructor(private authService: AuthService) {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.actorForm.valid) {
      this.authService.login(this.model.username, this.model.password)
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.loading = false;
          },
          error: (err) => {
            console.log('Login failed', err);
            this.error = 'Login failed. Please check your credentials.';
            this.loading = false;
            this.submitted = false;
          }
        });
    } else {
      this.loading = false;
      this.submitted = false;
    }
  }
}
