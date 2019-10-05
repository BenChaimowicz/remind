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

  public async loginUser(login: Login): Promise<boolean> {
    if (!login) { return false; }
    try {
      const token: Token = await this.http.post<Token>(`${this.baseURL}/login`, login).toPromise();
      if (token) {
        this.setUser(token);
        this.currentUserSubject.next({ email: token.email, userName: token.userName });
        return true;
      } else {
        console.error('Could not log in');
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
  private setUser(token: Token) {
    localStorage.setItem('token', JSON.stringify(token.token));
  }

  private getUser() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return JSON.parse(token);
    } else {
      return null;
    }
  }
}
