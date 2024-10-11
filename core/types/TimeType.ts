import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';
import { ValidationError } from '../errors.ts';

export class TimeType extends Type {

  override convertToDatabaseValue(value: any, platform: Platform): string {
    if (value && !value.toString().match(/^\d{2,}:(?:[0-5]\d):(?:[0-5]\d)$/)) {
      throw ValidationError.invalidType(TimeType, value, 'JS');
    }

    return super.convertToDatabaseValue(value, platform);
  }

  override compareAsType(): string {
    return 'string';
  }

  override ensureComparable(): boolean {
    return false;
  }

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getTimeTypeDeclarationSQL(prop.length);
  }

  override getDefaultLength(platform: Platform): number {
    return platform.getDefaultDateTimeLength();
  }

}
