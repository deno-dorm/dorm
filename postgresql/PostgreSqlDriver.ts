import type { Configuration } from '@dorm/core';
import { AbstractSqlDriver } from '@mikro-orm/knex';
import { PostgreSqlConnection } from './PostgreSqlConnection.ts';
import { PostgreSqlPlatform } from './PostgreSqlPlatform.ts';

export class PostgreSqlDriver extends AbstractSqlDriver<PostgreSqlConnection> {

  constructor(config: Configuration) {
    super(config, new PostgreSqlPlatform(), PostgreSqlConnection, ['knex', 'pg']);
  }

}
