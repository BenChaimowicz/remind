import { User } from './user.interface';

export interface Remind {
  id?: number;
  name: string;
  reward?: number;
  createdBy?: User;
}

export interface RemindList {
  id?: number;
  name: string;
  createdBy?: User;
  reminds: Remind[];
}
