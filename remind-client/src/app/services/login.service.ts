import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Login, Token} from '../interfaces/login.interface';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseURL = `http://localhost:3000/auth`;
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private async loginUser(login: Login): Promise<boolean> {
    if (!login) { return; }

    try {
      const token: Token = await this.http.post<Token>(`${this.baseURL}/login`, login).toPromise();
      if (token) {
        this.setUser(token);
        return true;
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

}
