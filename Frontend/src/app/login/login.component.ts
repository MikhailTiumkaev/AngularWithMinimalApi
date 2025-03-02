import { Component, inject, signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule
  ]
})

export class LoginComponent {
  formBuilder = inject(FormBuilder);
  
  loginForm = this.formBuilder.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required, 
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).+$')]
    ],
    confirm_password: ['', [
      Validators.required]
    ],
    checkbox: ['', Validators.requiredTrue],
    
  });

  private dataService  = inject(DataService)
  private route = inject(Router)

  constructor() { }

  navigateToStep2() {
    console.log(this.loginForm.value);
    const user: User = {
       login: '',//this.loginForm.get("login")!.value!,
       password: ''//this.password.value!
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

