import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/api/auth.service';
import { UserService } from '../../../../shared/services/user.service';
import { RoutePaths } from '../../../../shared/constants/route-pathes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
  private destroyRef = inject(DestroyRef);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  async onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.actorForm.valid) {
      this.authService
        .login(this.model.username, this.model.password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.loading = false;
            this.userService.setUser(response);
            this.router.navigate([`/${RoutePaths.ROOT}`]);
          },
          error: (err) => {
            console.log('Login failed', err);
            this.error = 'Login failed. Please check your credentials.';
            this.loading = false;
            this.submitted = false;
          },
        });
    } else {
      this.loading = false;
      this.submitted = false;
    }
  }
}
