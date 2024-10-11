import { StringType } from './StringType.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class CharacterType extends StringType {

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getCharTypeDeclarationSQL(prop);
  }

  override getDefaultLength(platform: Platform): number {
    return platform.getDefaultCharLength();
  }

}
