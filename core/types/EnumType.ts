import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class EnumType extends Type<string | null | undefined> {

  override getColumnType(prop: EntityProperty, platform: Platform) {
    if (prop.nativeEnumName) {
      return prop.nativeEnumName;
    }

    return prop.columnTypes?.[0] ?? platform.getEnumTypeDeclarationSQL(prop);
  }

  override compareAsType(): string {
    return 'string';
  }

  override ensureComparable(): boolean {
    return false;
  }

}
