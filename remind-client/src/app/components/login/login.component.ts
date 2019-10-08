import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from 'src/app/interfaces/user.interface';
import { Login } from '../../interfaces/login.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public currentUser: User;
  public profileImage: string;
  public loginForm: FormGroup = new FormGroup({
    emailInput: new FormControl('', [Validators.required]),
    passwordInput: new FormControl('', [Validators.required]),
    rememberInput: new FormControl(true, [])
  });
  public errorMessage: string;

  constructor(private loginService: LoginService) {
    this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  public async login() {
    this.errorMessage = undefined;
    const loginObj: Login = {
      email: this.loginForm.controls.emailInput.value,
      password: this.loginForm.controls.passwordInput.value,
      remember: this.loginForm.controls.rememberInput.value
    };
    const login = await this.loginService.loginUser(loginObj);
    if (typeof login === 'string') { this.errorMessage = login; }
  }

  public logout() {
    this.loginService.logout();
  }
}
