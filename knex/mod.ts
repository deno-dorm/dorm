/**
 * @packageDocumentation
 * @module knex
 */
/* istanbul ignore file */
export * from './AbstractSqlConnection.ts';
export * from './AbstractSqlDriver.ts';
export * from './AbstractSqlPlatform.ts';
export * from './MonkeyPatchable.ts';
export * from './SqlEntityManager.ts';
export * from './SqlEntityRepository.ts';
export * from './query/index.ts';
export * from './schema/index.ts';
export * from './dialects/index.ts';
export * from './typings.ts';
export { SqlEntityManager as EntityManager } from './SqlEntityManager.ts';
export { SqlEntityRepository as EntityRepository } from './SqlEntityRepository.ts';

/** @ignore */
export { type Knex } from 'knex';
import knex from 'knex';
export {knex};
export * from '@dorm/core';
