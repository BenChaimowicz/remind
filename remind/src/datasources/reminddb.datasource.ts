import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './reminddb.datasource.json';

export class ReminddbDataSource extends juggler.DataSource {
  static dataSourceName = 'reminddb';

  constructor(
    @inject('datasources.config.reminddb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
