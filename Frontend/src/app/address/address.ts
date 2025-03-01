import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Province } from '../../models/province.model';

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


export class AddressPage implements OnInit, ErrorStateMatcher  {
  countries!: Country[];
  provinces!: Province[];
  addressForm!: FormGroup;
  country = null;
  province = null;
  //matcher = new MyErrorStateMatcher();
  
  constructor(private countryService: CountryService){ }
  
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  ngOnInit(): void {
      this.countryService.getCoutries().subscribe(result=> {
        this.countries = result
      });  
      // this.addressForm = this.formBuilder.group({
      //   country: [null, Validators.required],
      //   province: [null, Validators.required],
      // });
  }

  onAddressSubmit() {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
    } else {
      return;
    }
  }

  showProvince(e: any) {
    this.provinces = e.value.provinces;
  }
  
}

