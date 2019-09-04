import { User } from './../models/user.model';
import { HttpErrors } from '@loopback/rest';
import { Credentials } from './../auth';
import { PasswordHasher } from './password-hasher.service';
import { inject } from '@loopback/context';
import { UserRepository } from './../repositories/user.repository';
import {bind, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { PasswordHasherBindings } from '../bindings';

@bind({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher
  ) {
    
  }
  async verifyCredentials(credentials: Credentials): Promise<User | null> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepository.findOne({
      where: {uid: credentials.username},
    });

    if (foundUser === null) {
      return null;
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      return null;
    }

    return foundUser;
  }
}
