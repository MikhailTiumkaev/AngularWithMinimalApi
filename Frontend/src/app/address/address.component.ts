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
      this.countryService.getCoutries().subscribe(result=> {
        this.countries = result
      });
      this.dataService.currentUser.subscribe((currentUser)=>
      {
        this.user = currentUser!
      });
      // this.addressForm = this.formBuilder.group({
      //   country: [null, Validators.required],
      //   province: [null, Validators.required],
      // });
  }

  onAddressSubmit() {
    var userDTO ={} as UserDTO
    userDTO.login = this.user.login;
    userDTO.countryId = (this.addressForm.get('country')!.value as Country).id
    userDTO.provinceId = (this.addressForm.get('province')!.value as Province).id;

    console.log(userDTO.login, userDTO.countryId, userDTO.provinceId)

    this.dataService.SaveUser(userDTO);

    // if (this.addressForm.valid) {
    //   console.log(this.user.login)
    //   console.log(this.addressForm.value);
    // } else {
    //   return;
    // }
  }

  showProvince(e: any) {
    this.provinces = e.value.provinces;
  }
  
}

