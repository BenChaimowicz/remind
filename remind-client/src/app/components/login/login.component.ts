import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from 'src/app/interfaces/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/interfaces/login.interface';

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
    passwordInput: new FormControl('', [Validators.required])
  });

  constructor(private loginService: LoginService) {
    this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  public async login() {
    const loginObj: Login = { email: this.loginForm.controls.emailInput.value, password: this.loginForm.controls.passwordInput.value };
    const login = await this.loginService.loginUser(loginObj);
  }
}
