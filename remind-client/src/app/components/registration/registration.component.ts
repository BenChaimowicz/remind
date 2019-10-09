import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { RegistrationValidators } from 'src/app/validators/registration.validator';
import { NgbDateCustomParserFormatter } from '../../adapters/dateformat.adapter';
import { User } from 'src/app/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})
export class RegistrationComponent implements OnInit {

  date: NgbDateStruct;
  public disclaimer = `Remind is a web application designed to help you commit to better handling your
  time while also thinking of cool new ways to spend it, for you and others.
  By sharing your daily tasks with others, and getting points while achieving them, Remind aims to make everyone
  more effective and driven towards one's goals. Please note that all fields are required!`;
  public regForm: FormGroup = new FormGroup({
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    userNameInput: new FormControl('', [Validators.required, Validators.pattern(RegistrationValidators.userNamePattern)]),
    passwords: new FormGroup({
      passwordInput: new FormControl('', [Validators.required, RegistrationValidators.cannotContainSpace]),
      passwordVerify: new FormControl('', [Validators.required])
    }, [Validators.required, RegistrationValidators.mustBeSameAs]),
    birthdayInput: new FormControl(moment(), [Validators.required])
  });

  constructor(private loginService: LoginService, public calendar: NgbCalendar, private toastr: ToastrService) {

  }

  ngOnInit() {
  }

  public async register() {
    const user: User = this.createUser();
    const register = await this.loginService.registerUser(user);
    if (typeof register !== 'string') {
      this.toastr.success(`Successfuly registered ${user.userName}! You can now log in!`);
    } else {
      this.toastr.error(`Failed to register ${user.userName}. Please contact tech support.`);
    }
  }

  private createUser(): User {
    const user: User = {
      email: this.regForm.controls.emailInput.value,
      userName: this.regForm.controls.userNameInput.value,
      dateOfBirth: this.regForm.controls.birthdayInput.value,
      password: this.regForm.get('passwords.passwordInput').value
    };
    return user;
  }
}
