import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  spinnerImg = '../../../assets/spinner.svg';
  @Input() showSpinner = true;

  constructor() { }

  ngOnInit() {
  }

  public show() { this.showSpinner = true; }

  public hide() { this.showSpinner = false; }
}
