import {
  defineConfig,
  MikroORM,
  type Options,
  type IDatabaseDriver,
  type EntityManager,
  type EntityManagerType,
} from '@dorm/core';
import { PostgreSqlDriver } from './PostgreSqlDriver.ts';
import type { SqlEntityManager } from '@dorm/knex';

/**
 * @inheritDoc
 */
export class PostgreSqlMikroORM<EM extends EntityManager = SqlEntityManager> extends MikroORM<PostgreSqlDriver, EM> {

  private static DRIVER = PostgreSqlDriver;

  /**
   * @inheritDoc
   */
  static override async init<D extends IDatabaseDriver = PostgreSqlDriver, EM extends EntityManager = D[typeof EntityManagerType] & EntityManager>(options?: Options<D, EM>): Promise<MikroORM<D, EM>> {
    return super.init(options);
  }

}

export type PostgreSqlOptions = Options<PostgreSqlDriver>;

/* istanbul ignore next */
export function definePostgreSqlConfig(options: PostgreSqlOptions) {
  return defineConfig({ driver: PostgreSqlDriver, ...options });
}
