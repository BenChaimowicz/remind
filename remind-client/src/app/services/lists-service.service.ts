import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RemindList, Remind } from '../interfaces/remind.interface';

@Injectable({
  providedIn: 'root'
})
export class ListsServiceService {

  private readonly BASEURL = `http://localhost:3000/lists`;
  private readonly emptyRemind: Remind = { id: 0, name: 'Empty', reward: 0 };

  mocklist: RemindList = {
    id: 1,
    name: 'MockList',
    reminds: [
      { id: 1, name: 'remind1', reward: 10 },
      { id: 2, name: 'remind2', reward: 10 },
      { id: 3, name: 'remind3', reward: 10 },
      { id: 4, name: 'remind4', reward: 10 },
    ]
  };
  lists: RemindList[] = [this.mocklist];

  constructor(private http: HttpClient) {
    for (let i = 4; i < 12; i++) {
      this.mocklist.reminds.push(this.emptyRemind);
    }
  }

  public async getRemindLists(): Promise<RemindList[]> {
    return this.lists;
  }

  public async newList(name: string): Promise<RemindList> {
    const newArray: Remind[] = [];
    for (let i = 0; i < 12; i++) {
      newArray.push(this.emptyRemind);
    }
    const newList: RemindList = {
      id: 0,
      name,
      reminds: newArray
    };
    this.lists.push(newList);
    return newList;
  }
}
