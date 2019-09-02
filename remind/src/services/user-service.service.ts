import { inject } from '@loopback/context';
import { UserRepository } from './../repositories/user.repository';
import {bind, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';

@bind({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject()) { }

  /*
   * Add service methods here
   */
}
