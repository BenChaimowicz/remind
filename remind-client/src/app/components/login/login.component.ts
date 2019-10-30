import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from 'src/app/interfaces/user.interface';
import { Login } from '../../interfaces/login.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { dropDown } from 'src/app/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    dropDown
  ]
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
  public shouldLogin = false;
  public isOpenOptions = false;
  public isOpenForm = false;
  public showSpinner = false;

  constructor(private loginService: LoginService, private toastr: ToastrService) {
    this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) { this.shouldLogin = false; }
    });
    this.loginService.notLoggedIn.subscribe(() => {
      this.notLoggedIn();
    });
  }

  ngOnInit() {
  }

  public async login() {
    this.showSpinner = true;
    this.errorMessage = undefined;
    const loginObj: Login = {
      email: this.loginForm.controls.emailInput.value,
      password: this.loginForm.controls.passwordInput.value,
      remember: this.loginForm.controls.rememberInput.value
    };
    const login = await this.loginService.loginUser(loginObj).then(() => this.showSpinner = false);
    if (typeof login === 'string') {
      this.errorMessage = login;
      this.toastr.error(this.errorMessage);
    } else {
      this.toastr.success(`Welcome ${this.currentUser.userName}!`);
    }
  }

  public logout() {
    this.toastr.success(`Goodbye ${this.currentUser.userName}!`);
    this.loginService.logout();
  }

  private notLoggedIn() {
    this.toastr.error('You must log in for this action!');
    this.shouldLogin = true;
  }


}
