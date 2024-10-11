import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class IntegerType extends Type<number | null | undefined, number | null | undefined> {

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getIntegerTypeDeclarationSQL(prop);
  }

  override compareAsType(): string {
    return 'number';
  }

  override ensureComparable(): boolean {
    return false;
  }

}
