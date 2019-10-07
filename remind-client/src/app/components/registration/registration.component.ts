import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public regForm: FormGroup = new FormGroup({
    emailInput: new FormControl('', [Validators.required]),
    userNameInput: new FormControl('', [Validators.required]),
    passwords: new FormGroup({
      passwordInput: new FormControl('', []),
      passwordVerify: new FormControl('', [])
    }, [Validators.required]),
    birthdayInput: new FormControl(moment().format('DD MM YYYY'), [Validators.required])
  });

  constructor(private loginService: LoginService, private calender: NgbCalendar) { }

  ngOnInit() {
  }

}
