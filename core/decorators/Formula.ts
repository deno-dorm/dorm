import { MetadataStorage } from '../metadata/index.ts';
import { ReferenceKind } from '../enums.ts';
import type { EntityKey, EntityProperty, AnyEntity } from '../typings.ts';
import type { PropertyOptions } from './Property.ts';

export function Formula<T extends object>(formula: string | ((alias: string) => string), options: FormulaOptions<T> = {}) {
  return function (target: AnyEntity, propertyName: string) {
    const meta = MetadataStorage.getMetadataFromDecorator(target.constructor as T);
    meta.properties[propertyName as EntityKey<T>] = {
      name: propertyName,
      kind: ReferenceKind.SCALAR,
      formula,
      ...options,
    } as EntityProperty<T>;
  };
}

export interface FormulaOptions<T> extends PropertyOptions<T> { }
