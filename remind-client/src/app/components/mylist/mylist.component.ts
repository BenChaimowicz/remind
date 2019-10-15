import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ListsServiceService } from 'src/app/services/lists-service.service';
import { RemindList } from 'src/app/interfaces/remind.interface';
import { expandToSide } from 'src/app/animations';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css'],
  animations: [
    expandToSide
  ]
})
export class MylistComponent implements OnInit {

  remindLists: RemindList[] = [];
  currList: RemindList;
  showInput = false;
  inputGroup: FormGroup = new FormGroup({
    listName: new FormControl('', [Validators.required])
  });

  constructor(private listService: ListsServiceService) {
  }

  ngOnInit() {
    this.getLists();
  }

  public toggleShowInput() {
    this.showInput = !this.showInput;
  }

  public newList() {
    this.listService.newList(this.inputGroup.get('listName').value);
  }

  private async getLists() {
    this.remindLists = await this.listService.getRemindLists();
    this.selectActiveList(this.remindLists[0]);
    const newList = await this.listService.newList('kaki');
    console.log(newList);
  }

  public getListById(id: number): RemindList {
    return this.remindLists.find(list => list.id === Number(id));
  }

  public getListByName(name: string): RemindList {
    return this.remindLists.find(list => list.name === name);
  }

  public async selectActiveList(list: RemindList) {
    this.currList = list;
  }

  public onChange(id: number) {
    console.log(id);
    console.log(this.getListById(id));
    this.selectActiveList(this.getListById(id));
  }
}
