import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country.model';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Province } from '../models/province.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../models/user.model';
import { UserDTO } from '../models/user-dto';

@Component({
  selector: 'app-address',
  templateUrl: 'address.component.html',
  styleUrl: 'address.component.css',
  standalone: true,
  imports: [
    MatSelectModule, 
    MatButtonModule,
    CommonModule
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class AddressComponent implements OnInit, ErrorStateMatcher  {
  user!: User;
  countries!: Country[];
  provinces!: Province[];
  country!: Country;
  province!: Province;
  addressForm!: FormGroup;
  //matcher = new MyErrorStateMatcher();
  
  constructor(
    private dataService: DataService,
    private countryService: CountryService,){ }
  
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  ngOnInit(): void {
      this.dataService.currentUser.subscribe((currentUser)=>
      {
        this.user = currentUser!
      });
      this.countryService.getCoutries().subscribe(result=> {
        this.countries = result
      });
  }

  onAddressSubmit() {
    var userDTO ={} as UserDTO
    userDTO.login = this.user.login;
    userDTO.countryId = this.country.id
    userDTO.provinceId = this.province.id

    this.dataService.SaveUser(userDTO);
  }
  
  setProvince(e: any) {
    this.province = e.value;
  }
  

  setCountryAndShowProvince(e: any) {
    this.country = e.value;
    this.provinces = e.value.provinces;
  }
  
}

