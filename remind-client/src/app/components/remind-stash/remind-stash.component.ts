import { Component, OnInit, Input } from '@angular/core';
import { StashService } from 'src/app/services/stash.service';
import { Remind } from 'src/app/interfaces/remind.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-remind-stash',
  templateUrl: './remind-stash.component.html',
  styleUrls: ['./remind-stash.component.css']
})
export class RemindStashComponent implements OnInit {

  @Input() remindStash: Remind[] = [];

  constructor(private stashService: StashService) { }

  ngOnInit() {
  }

  private getStash() {
  }

  public onDrop(drop: CdkDragDrop<Remind>) {

  }
}
