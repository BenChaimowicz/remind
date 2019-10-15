import { Component, OnInit, Input } from '@angular/core';
import { RemindList, Remind } from 'src/app/interfaces/remind.interface';
import { ListsServiceService } from 'src/app/services/lists-service.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dragdroplist',
  templateUrl: './dragdroplist.component.html',
  styleUrls: ['./dragdroplist.component.css']
})
export class DragdroplistComponent implements OnInit {

  @Input() remindList: RemindList;

  constructor(private listService: ListsServiceService) {
  }

  ngOnInit() {
  }

  public onDrop(drop: CdkDragDrop<Remind>) {
    [this.remindList.reminds[drop.previousIndex], this.remindList.reminds[drop.currentIndex]] = [this.remindList.reminds[drop.currentIndex], this.remindList.reminds[drop.previousIndex]];
  }
}
