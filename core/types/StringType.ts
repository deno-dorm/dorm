import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class StringType extends Type<string | null | undefined, string | null | undefined> {

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getVarcharTypeDeclarationSQL(prop);
  }

  override compareAsType(): string {
    return 'string';
  }

  override ensureComparable(): boolean {
    return false;
  }

  override getDefaultLength(platform: Platform): number {
    return platform.getDefaultVarcharLength();
  }

}
