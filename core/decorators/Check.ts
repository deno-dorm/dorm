import { MetadataStorage } from '../metadata/index.ts';
import { Utils } from '../utils/Utils.ts';
import type { CheckConstraint, Dictionary } from '../typings.ts';

export function Check<T>(options: CheckOptions<T>) {
  return function (target: any, propertyName?: string) {
    const meta = MetadataStorage.getMetadataFromDecorator<T>((propertyName ? target.constructor : target) as T & Dictionary);
    options.property ??= propertyName;
    meta.checks.push(options);

    if (!propertyName) {
      return target;
    }

    return Utils.propertyDecoratorReturnValue();
  };
}

export type CheckOptions<T = any> = CheckConstraint<T>;
