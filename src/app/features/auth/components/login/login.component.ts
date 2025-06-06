import { Component, DestroyRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/api/auth.service';
import { UserService } from '../../../../shared/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { takeUntil } from 'rxjs';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, //если у нас стандалон компонент, то весь коммон модуль можно не импортить, лучше конкретные модули которые нужны (подсветится что надо будет импортнуть), чтобы облегчить прилагу
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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private destroyRef: DestroyRef,
    private router: Router
  ) {}

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.actorForm.valid) {
      this.authService
        .login(this.model.username, this.model.password)
        .pipe(takeUntilDestroyed(this.destroyRef)) // takeUntilDestroyed это отписка, произойдет в момент уничтожения компонента (если использовать в сервисе - в момент уничтожения сервиса и тд). это самый простой и наиболее испольуземый вариант
        //variant 2:
        //.pipe(takeUntil(#destroy$)) //destroy$ - какой-то сабжект который коплитишь сам в любом месте, и когда от комплитнется - то и здесь будет отписка
        // еще момент просто для информации: для отловли ошибок можно использовать и rxjs (пример строчкой ниже), но это не обязательно и зависит от кейса
        //catchError(() => throwError(() => ERROR_MESSAGE))
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.loading = false;
            this.userService.setUser(response);
            this.router.navigate(['/categories']);
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
