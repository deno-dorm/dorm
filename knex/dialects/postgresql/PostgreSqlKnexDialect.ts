import type { Configuration } from '@dorm/core';
import { PostgreSqlTableCompiler } from './PostgreSqlTableCompiler.ts';
import { PostgreSqlQueryCompiler } from './PostgreSqlQueryCompiler.ts';
import { MonkeyPatchable } from '../../MonkeyPatchable.ts';

export class PostgreSqlKnexDialect extends MonkeyPatchable.PostgresDialect {

  ormConfig!: Configuration;

  tableCompiler() {
    // eslint-disable-next-line prefer-rest-params
    const tableCompiler = new (PostgreSqlTableCompiler as any)(this, ...arguments);
    tableCompiler.ormConfig = this.ormConfig;

    return tableCompiler;
  }

  queryCompiler() {
    // eslint-disable-next-line prefer-rest-params
    return new (PostgreSqlQueryCompiler as any)(this, ...arguments);
  }

}
