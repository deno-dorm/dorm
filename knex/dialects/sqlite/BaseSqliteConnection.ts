import type { Knex } from 'knex';
import { ensureDir } from '@std/fs';
import { dirname } from 'node:path';
import { AbstractSqlConnection } from '../../AbstractSqlConnection.ts';
import { Utils } from '@dorm/core';

export abstract class BaseSqliteConnection extends AbstractSqlConnection {

  override async connect(): Promise<void> {
    this.createKnex();
    await ensureDir(dirname(this.config.get('dbName')!));
    await this.client.raw('pragma foreign_keys = on');
  }

  getDefaultClientUrl(): string {
    return '';
  }

  override getClientUrl(): string {
    return '';
  }

  override async loadFile(path: string): Promise<void> {
    const conn = await this.client.client.acquireConnection();
    await conn.exec((await Deno.readFile(path)).toString());
    await this.client.client.releaseConnection(conn);
  }

  protected override getKnexOptions(type: string): Knex.Config {
    return Utils.mergeConfig({
      client: type,
      connection: {
        filename: this.config.get('dbName'),
      },
      pool: this.config.get('pool'),
      useNullAsDefault: true,
    }, this.config.get('driverOptions'));
  }

  protected transformRawResult<T>(res: any, method: 'all' | 'get' | 'run'): T {
    if (method === 'get') {
      return res[0];
    }

    if (method === 'all') {
      return res;
    }

    if (Array.isArray(res)) {
      return {
        insertId: res[res.length - 1]?.id ?? 0,
        affectedRows: res.length,
        row: res[0],
        rows: res,
      } as T;
    }

    return {
      insertId: res.lastInsertRowid,
      affectedRows: res.changes,
    } as unknown as T;
  }

}
