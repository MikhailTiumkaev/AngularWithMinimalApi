import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<button (click)="navigateToAbout()">Go to About</button>`
})

export class HomeComponent {
  constructor(private router: Router) { }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }
}
