import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css'],
  animations: [
    trigger('throwIn', [
      transition('void => *', [
        style({ transform: 'translateX(-10%)', width: '0' }),
        animate('500ms ease')]),
      transition('* => void', [
        style({ opacity: 0 }),
        animate('200ms ease')])
    ])
  ]
})
export class MylistComponent implements OnInit {

  showInput = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleShowInput() {
    this.showInput = !this.showInput;
  }

}
