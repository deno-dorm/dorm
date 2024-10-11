import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class UuidType extends Type<string | null | undefined> {

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getUuidTypeDeclarationSQL(prop);
  }

  override compareAsType(): string {
    return 'string';
  }

  override ensureComparable(): boolean {
    return false;
  }

}
