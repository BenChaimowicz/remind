import { Token } from './../interfaces/login.interface';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): Token | null {
    if (localStorage.getItem('token') !== null) {
      return JSON.parse(localStorage.getItem('token'));
    }
  }
}
