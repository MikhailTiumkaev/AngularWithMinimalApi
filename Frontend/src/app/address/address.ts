import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  templateUrl: 'address.html',
  styleUrl: 'address.css',
  standalone: true,
  imports: [
    MatSelectModule, 
    MatButtonModule,
    CommonModule
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class AddressPage implements OnInit {
  countries!: Country[];
  
  constructor(private countryService: CountryService){ }

  ngOnInit(): void {
      this.countryService
      .getCoutries()
      .subscribe(result=> {
        this.countries = result
      });  
  }
  
}

