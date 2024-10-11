import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';
import { IntegerType } from './IntegerType.ts';

export class MediumIntType extends IntegerType {

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getMediumIntTypeDeclarationSQL(prop);
  }

}
