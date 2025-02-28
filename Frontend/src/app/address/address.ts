import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-address',
  templateUrl: 'address.html',
  styleUrl: 'address.css',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatSelectModule, 
    MatCheckboxModule,
    MatButtonModule,
    MatStepperModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddressPage {
  errorMessage = signal('');

  constructor() {
    merge()
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    this.errorMessage.set('');
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

