import { BindingKey } from '@loopback/context';
import { PasswordHasher } from './services/password-hasher.service';


export namespace PasswordHasherBindings {
    export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
      'services.hasher',
    );
    export const ROUNDS = BindingKey.create<number>('services.hasher.round');
  }