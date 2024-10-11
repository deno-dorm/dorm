import BaseMySqlQueryCompiler from 'knex/lib/dialects/mysql/query/mysql-querycompiler.js';
import QueryCompiler from 'knex/lib/query/querycompiler.js';

// upsert support from https://github.com/knex/knex/pull/6050
export class MySqlQueryCompiler extends BaseMySqlQueryCompiler {

  // mysql dialect disallows query non scalar params, but we dont use it to execute the query, it always goes through the `platform.formatQuery()`
  whereBasic(statement: any) {
    return QueryCompiler.prototype.whereBasic.call(this, statement);
  }

  // mysql dialect disallows query non scalar params, but we dont use it to execute the query, it always goes through the `platform.formatQuery()`
  whereRaw(statement: any) {
    return QueryCompiler.prototype.whereRaw.call(this, statement);
  }

}
