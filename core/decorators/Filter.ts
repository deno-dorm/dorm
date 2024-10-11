import { MetadataStorage } from '../metadata/index.ts';
import type { Dictionary, FilterDef } from '../typings.ts';

export function Filter<T>(options: FilterDef) {
  return function <U>(target: U & Dictionary) {
    const meta = MetadataStorage.getMetadataFromDecorator(target);
    meta.filters[options.name] = options;

    return target;
  };
}
