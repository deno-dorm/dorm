import { SqliteTableCompiler } from './SqliteTableCompiler.ts';
import { MonkeyPatchable } from '../../MonkeyPatchable.ts';

export class BetterSqliteKnexDialect extends MonkeyPatchable.BetterSqlite3Dialect {

  _driver() {
    return import('better-sqlite3');
  }

  tableCompiler() {
    // eslint-disable-next-line prefer-rest-params
    return new (SqliteTableCompiler as any)(this, ...arguments);
  }

}
