import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

/**
 * Type that maps an SQL DOUBLE to a JS string or number.
 */
export class DoubleType extends Type<number | string, string> {

  override convertToJSValue(value: string): number | string {
    if (this.prop?.runtimeType === 'number') {
      return +value;
    }

    return value;
  }

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getDoubleDeclarationSQL();
  }

  override compareAsType(): string {
    return this.prop?.runtimeType ?? 'number';
  }

}
