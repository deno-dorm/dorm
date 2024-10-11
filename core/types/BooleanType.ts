import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class BooleanType extends Type<number | null | undefined, number | null | undefined> {

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getBooleanTypeDeclarationSQL();
  }

  override compareAsType(): string {
    return 'boolean';
  }

  override ensureComparable(): boolean {
    return false;
  }

}
