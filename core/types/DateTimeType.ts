import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class DateTimeType extends Type<Date, string> {

  override getColumnType(prop: EntityProperty, platform: Platform): string {
    return platform.getDateTimeTypeDeclarationSQL({ length: prop.length });
  }

  override compareAsType(): string {
    return 'Date';
  }

  override get runtimeType(): string {
    return 'Date';
  }

  override ensureComparable(): boolean {
    return false;
  }

  override getDefaultLength(platform: Platform): number {
    return platform.getDefaultDateTimeLength();
  }

}
