import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css'],
  animations: [
    trigger('throwIn', [
      state('void', style({ width: 0, flexGrow: 0 })),
      transition('void <=> *', [animate(750)])
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
