import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { __values } from 'tslib';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { UserDTO } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userData = new BehaviorSubject<User>({} as User);
  currentUser = this.userData.asObservable();

  constructor(private httpClient: HttpClient) { }

  changeUserData(user: User) {
    this.userData.next(user)
  }

  SaveUser(user: UserDTO) {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post('http://localhost:5002/user', user, HTTP_OPTIONS);
  }
}
