import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Login, Token } from '../interfaces/login.interface';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseURL = `http://localhost:3000/auth`;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public async registerUser(user: User) {
    try {
      const result = await this.http.post(`${this.baseURL}/register`, user).toPromise();
      return result;
    } catch (err) {
      console.error(err);
      return 'Could not register at this time.';
    }
  }

  public async loginUser(login: Login): Promise<boolean | string> {
    if (!login) { return 'Nothing was typed'; }
    try {
      const token: Token = await this.http.post<Token>(`${this.baseURL}/login`, login).toPromise();
      if (token) {
        this.currentUserSubject.next({ email: token.email, userName: token.userName });
        if (login.remember) { this.setUser(token); }
        return true;
      } else {
        console.error('Could not log in');
        return false;
      }
    } catch (err) {
      return 'Wrong credentials';
    }
  }

  public logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
  private setUser(token: Token) {
    localStorage.setItem('token', JSON.stringify(token.token));
    localStorage.setItem('user', JSON.stringify({ userName: token.userName, email: token.email }));
  }

  private getUser() {
    const user = localStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
}
