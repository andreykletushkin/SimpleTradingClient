import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/auth/signin',{username, password}).pipe(
      map(userData => {
        console.log(userData)
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', userData.token);
        return userData;
      })
    );
  }


  isUserLoggedIn() {
    const user = sessionStorage.getItem('username')
    return !(user === null);
  }

}
