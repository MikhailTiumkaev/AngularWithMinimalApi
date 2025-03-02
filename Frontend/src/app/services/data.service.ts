import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { __values } from 'tslib';
import { HttpClient } from '@angular/common/http';
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
    this.httpClient.post<UserDTO>('http://localhost:5002/user', user).subscribe(response => {
      console.log('Added user:', response);
    });
  }
}
