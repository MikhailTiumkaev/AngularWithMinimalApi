import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-address',
  templateUrl: 'address.html',
  styleUrl: 'address.css',
  standalone: true,
  imports: [
    MatSelectModule, 
    MatButtonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddressPage {
}

