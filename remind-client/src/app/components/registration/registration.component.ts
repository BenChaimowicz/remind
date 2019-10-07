import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public today = `${this.calendar.getToday().day}-${this.calendar.getToday().month}-${this.calendar.getToday().year}`;
  public disclaimer = `Remind is a web application designed to help you commit to better handling your
  time while also thinking of cool new ways to spend it, for you and others.
  By sharing your daily tasks with others, and getting points while achieving them, Remind aims to make everyone
  more effective and driven towards one's goals.`;
  public regForm: FormGroup = new FormGroup({
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    userNameInput: new FormControl('', [Validators.required]),
    passwords: new FormGroup({
      passwordInput: new FormControl('', [Validators.required]),
      passwordVerify: new FormControl('', [Validators.required])
    }, [Validators.required]),
    birthdayInput: new FormControl(this.today, [Validators.required])
  });

  constructor(private loginService: LoginService, public calendar: NgbCalendar) {
    console.log(this.today);
  }

  ngOnInit() {
  }

  public async register() {

  }
}
