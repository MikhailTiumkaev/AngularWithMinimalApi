import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatSelectModule, 
    MatCheckboxModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginComponent {
  private dataService  = inject(DataService)
  private route = inject(Router)
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly checkbox = new FormControl('', [Validators.requiredTrue]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  readonly confirm_password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  errorMessage = signal('');


  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
    merge(this.confirm_password.statusChanges, this.confirm_password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateConfirmPasswordErrorMessage());
    merge(this.checkbox.statusChanges, this.checkbox.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateCheckBoxErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  updateCheckBoxErrorMessage() {
    if (this.checkbox.hasError('required')) {
      this.errorMessage.set('You must agree');
    }
    else {
      this.errorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.password.hasError('password')) {
      this.errorMessage.set('Not a valid password');
    } else {
      this.errorMessage.set('');
    }
  }

  updateConfirmPasswordErrorMessage() {
    if (this.confirm_password.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.confirm_password.hasError('password')) {
      this.errorMessage.set('Not a valid password');
    } else {
      this.errorMessage.set('');
    }
  }

  navigateToStep2() {
    const user: User = {
      login: this.email.value!,
      password: this.password.value!
    };
    this.dataService.changeUserData(user);
    this.route.navigate(['/address']);
  }
  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

