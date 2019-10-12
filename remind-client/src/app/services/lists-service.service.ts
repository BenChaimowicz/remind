import { Injectable } from '@angular/core';
import { RemindList } from '../interfaces/remind.interface';

@Injectable({
  providedIn: 'root'
})
export class ListsServiceService {

  mocklist: RemindList = {
    id: 1,
    name: 'MockList',
    reminds: [
      { id: 1, name: 'remind1', reward: 10 },
      { id: 2, name: 'remind2', reward: 10 },
      { id: 3, name: 'remind3', reward: 10 },
      { id: 4, name: 'remind4', reward: 10 }
    ]
  };

  constructor() {

  }

  public async getRemindLists() {
    return this.mocklist;
  }
}
