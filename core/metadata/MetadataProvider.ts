import type { EntityMetadata } from '../typings.ts';
import type { Logger } from '../logging/Logger.ts';
import { Utils } from '../utils/Utils.ts';

// to get around circular dependencies
export interface IConfiguration {
  get(key: string, defaultValue?: any): any;
  getLogger(): Logger;
}

export abstract class MetadataProvider {

  constructor(protected readonly config: IConfiguration) { }

  abstract loadEntityMetadata(meta: EntityMetadata, name: string): void;

  loadFromCache(meta: EntityMetadata, cache: EntityMetadata): void {
    Object.values(cache.properties).forEach(prop => {
      const metaProp = meta.properties[prop.name];

      if (metaProp?.enum && Array.isArray(metaProp.items)) {
        delete prop.items;
      }
    });

    Utils.mergeConfig(meta, cache);
  }

  useCache(): boolean {
    return false;
  }

}
