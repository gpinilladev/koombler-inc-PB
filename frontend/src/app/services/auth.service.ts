import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey = 'AIzaSyB9P3TnGx4Y_BKJ82gi2A5ZcXy0ZxZJZcc';
  private userToken: string;

  constructor(
    private http: HttpClient,
  ) {
    this.getToken();
  }

  private getToken() {
    this.userToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  }

  logout() {
    localStorage.removeItem('token');
  }

  signUp(user: User) {
    const authData = {
      email: user.email,
      password: user.clave, 
      returnSecureToken: true,
      
    };
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, authData).pipe(map(res => {
      this.saveToken(res['idToken']);
      return res;
    }));
  }

  signIn(user: User) {
    const authData = {
      email: user.email,
      password: user.clave, 
      returnSecureToken: true,
      
    };
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, authData).pipe(map(res => {
      this.saveToken(res['idToken']);
      return res;
    }));
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  private getTokenExpirationDate() {
    let token = decode(localStorage.getItem('token'));
    if (!token) {
      return null;
    }

    let date = new Date(0);
    date.setUTCSeconds(token['exp']);
    return date;
  }

  private isTokenExpired() {
    let expDate = this.getTokenExpirationDate();
    return expDate < new Date();
  }

  public isLoggedIn(): boolean {
    this.getToken();
    return !!this.userToken && !this.isTokenExpired();
  }

}
