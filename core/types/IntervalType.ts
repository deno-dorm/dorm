import { Type } from './Type.ts';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class IntervalType extends Type<string | null | undefined, string | null | undefined> {

  override getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getIntervalTypeDeclarationSQL(prop);
  }

  override convertToJSValue(value: string | null | undefined, platform: Platform): string | null | undefined {
    return platform.convertIntervalToJSValue(value!) as string;
  }

  override convertToDatabaseValue(value: string | null | undefined, platform: Platform): string | null | undefined {
    return platform.convertIntervalToDatabaseValue(value) as string;
  }

  override getDefaultLength(platform: Platform): number {
    return platform.getDefaultDateTimeLength();
  }

}
