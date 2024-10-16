import type { Knex } from 'knex';
import {
  EntityManager,
  type AnyEntity,
  type ConnectionType,
  type EntityData,
  type EntityName,
  type EntityRepository,
  type GetRepository,
  type QueryResult,
  type FilterQuery,
  type LoggingOptions,
} from '@dorm/core';
import type { AbstractSqlDriver } from './AbstractSqlDriver.ts';
import type { QueryBuilder } from './query/index.ts';
import type { SqlEntityRepository } from './SqlEntityRepository.ts';

/**
 * @inheritDoc
 */
export class SqlEntityManager<Driver extends AbstractSqlDriver = AbstractSqlDriver> extends EntityManager<Driver> {

  /**
   * Creates a QueryBuilder instance
   */
  createQueryBuilder<Entity extends object, RootAlias extends string = never>(entityName: EntityName<Entity> | QueryBuilder<Entity>, alias?: RootAlias, type?: ConnectionType, loggerContext?: LoggingOptions): QueryBuilder<Entity, RootAlias> {
    const context = this.getContext(false);
    return this.driver.createQueryBuilder(entityName as EntityName<Entity>, context.getTransactionContext(), type, true, loggerContext ?? context.loggerContext, alias, this) as any;
  }

  /**
   * Shortcut for `createQueryBuilder()`
   */
  qb<Entity extends object, RootAlias extends string = never>(entityName: EntityName<Entity>, alias?: RootAlias, type?: ConnectionType, loggerContext?: LoggingOptions) {
    return this.createQueryBuilder(entityName, alias, type, loggerContext);
  }

  /**
   * Returns configured knex instance.
   */
  getKnex(type?: ConnectionType) {
    return this.getConnection(type).getKnex();
  }

  async execute<T extends QueryResult | EntityData<AnyEntity> | EntityData<AnyEntity>[] = EntityData<AnyEntity>[]>(queryOrKnex: string | Knex.QueryBuilder | Knex.Raw, params: any[] = [], method: 'all' | 'get' | 'run' = 'all', loggerContext?: LoggingOptions): Promise<T> {
    return this.getDriver().execute(queryOrKnex, params, method, this.getContext(false).getTransactionContext(), loggerContext);
  }

  override getRepository<T extends object, U extends EntityRepository<T> = SqlEntityRepository<T>>(entityName: EntityName<T>): GetRepository<T, U> {
    return super.getRepository<T, U>(entityName);
  }

  protected override applyDiscriminatorCondition<Entity extends object>(entityName: string, where: FilterQuery<Entity>): FilterQuery<Entity> {
    // this is handled in QueryBuilder now for SQL drivers
    return where;
  }

}
