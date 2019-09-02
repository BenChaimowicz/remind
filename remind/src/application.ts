import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { AuthenticationComponent, AuthenticationBindings } from '@loopback/authentication';
import * as path from 'path';
import { MySequence } from './sequence';
import { MyAuthBindings, MyAuthMetadataProvider, MyAuthActionProvider, MyAuthAuthenticationStrategyProvider } from './auth';

export class RemindApplication extends BootMixin(
  RepositoryMixin(RestApplication),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // this.component(AuthenticationComponent);
    this.bind(AuthenticationBindings.METADATA).toProvider(MyAuthMetadataProvider);
    this.bind(MyAuthBindings.STRATEGY).toProvider(MyAuthAuthenticationStrategyProvider);
    this.bind(AuthenticationBindings.AUTH_ACTION).toProvider(MyAuthActionProvider);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
