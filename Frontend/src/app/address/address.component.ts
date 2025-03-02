import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country.model';
import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Province } from '../models/province.model';
import { DataService } from '../services/data.service';
import { User } from '../models/user.model';
import { UserDTO } from '../models/user-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: 'address.component.html',
  styleUrl: 'address.component.css',
  standalone: true,
  imports: [
    MatSelectModule, 
    MatButtonModule,
    CommonModule,  
    ReactiveFormsModule      
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class AddressComponent implements OnInit  {
  formBuilder = inject(FormBuilder);
  private route = inject(Router)
  
  user!: User;
  countries!: Country[];
  provinces!: Province[];
  country!: Country;
  province!: Province;

  addressForm = this.formBuilder.group({
    country: [''],
    provinces: [''],   
  });

  constructor(
    private dataService: DataService,
    private countryService: CountryService){ }
  
  ngOnInit(): void {
      this.dataService.currentUser.subscribe((currentUser)=>
      {
        this.user = currentUser!
      });
      this.countryService.getCoutries().subscribe(result=> {
        this.countries = result
      });
  }
  
  setCountryAndShowProvince(e: any) {
    this.country = e.value;
    this.provinces = e.value.provinces;
  }

  setProvince(e: any) {
    this.province = e.value;
  }
   
  onAddressSubmit() {
    var userDTO ={} as UserDTO
    userDTO.login = this.user.login;
    userDTO.countryId = this.country.id
    userDTO.provinceId = this.province.id

    this.dataService.SaveUser(userDTO);
  }
}

