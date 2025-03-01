import { Injectable } from '@angular/core';
import { Country } from '../models/country.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  constructor(private httpClient: HttpClient) { }

  getCoutries(): Observable<Country[]>
  {
    return this.httpClient.get<Country[]>('http://localhost:5002/country');
  }  
}
