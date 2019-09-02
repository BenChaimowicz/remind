import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {ReminddbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.uid,
  UserRelations
> {
  constructor(
    @inject('datasources.reminddb') dataSource: ReminddbDataSource,
  ) {
    super(User, dataSource);
  }
}
