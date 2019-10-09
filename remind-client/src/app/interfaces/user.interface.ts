import * as moment from 'moment';

export interface User {
  userName: string;
  email: string;
  password?: string;
  dateOfBirth?: moment.Moment;
}
