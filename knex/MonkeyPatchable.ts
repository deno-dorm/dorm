import Client from 'knex/lib/client.js';
import QueryExecutioner from 'knex/lib/execution/internal/query-executioner.js';
import MySqlDialect from 'knex/lib/dialects/mysql2/index.js';
import MySqlColumnCompiler from 'knex/lib/dialects/mysql/schema/mysql-columncompiler.js';
import MySqlQueryCompiler from 'knex/lib/dialects/mysql/query/mysql-querycompiler.js';
import MsSqlColumnCompiler from 'knex/lib/dialects/mssql/schema/mssql-columncompiler.js';
import MsSqlTableCompiler from 'knex/lib/dialects/mssql/schema/mssql-tablecompiler.js';
import MsSqlQueryCompiler from 'knex/lib/dialects/mssql/query/mssql-querycompiler.js';
import MsSqlDialect from 'knex/lib/dialects/mssql/index.js';
import PostgresDialect from 'knex/lib/dialects/postgres/index.js';
import PostgresDialectTableCompiler from 'knex/lib/dialects/postgres/schema/pg-tablecompiler.js';
import PostgresQueryCompiler from 'knex/lib/dialects/postgres/query/pg-querycompiler.js';
import Sqlite3Dialect from 'knex/lib/dialects/sqlite3/index.js';
import BetterSqlite3Dialect from 'knex/lib/dialects/better-sqlite3/index.js';
import Sqlite3DialectTableCompiler from 'knex/lib/dialects/sqlite3/schema/sqlite-tablecompiler.js';
import TableCompiler from 'knex/lib/schema/tablecompiler.js';

// These specific portions of knex are overridden by the different
// database packages. We need to be sure the knex files they get to
// monkey patch are the same version as our overall knex instance
// which is why we need to import them in this package.
export const MonkeyPatchable = {
  Client,
  QueryExecutioner,
  MySqlDialect,
  MySqlColumnCompiler,
  MySqlQueryCompiler,
  MsSqlColumnCompiler,
  MsSqlTableCompiler,
  MsSqlQueryCompiler,
  MsSqlDialect,
  PostgresDialect,
  PostgresDialectTableCompiler,
  PostgresQueryCompiler,
  Sqlite3Dialect,
  Sqlite3DialectTableCompiler,
  BetterSqlite3Dialect,
  TableCompiler,
};
