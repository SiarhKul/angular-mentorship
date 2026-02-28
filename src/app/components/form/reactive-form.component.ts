import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type UserForm = FormGroup<{
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  address: FormControl<string | null>;
  mobile: FormControl<string | null>;
  age: FormControl<string | null>;
  gender: FormControl<string | null>;
}>;

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ReactiveFormComponent {
  userForm!: UserForm;
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: ['', [Validators.required, Validators.min(20), Validators.max(50)]],
      gender: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      console.log('Form data:', this.userForm.value);
    }
  }
}
