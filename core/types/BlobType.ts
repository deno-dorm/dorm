import { Uint8ArrayType } from './Uint8ArrayType.ts';
import {Buffer} from 'node:buffer';
import type { Platform } from '../platforms/mod.ts';
import type { EntityProperty } from '../typings.ts';

export class BlobType extends Uint8ArrayType {

  override convertToJSValue(value: Buffer): Buffer | null {
    if (value as unknown instanceof Buffer || !value) {
      return value;
    }

    /* istanbul ignore else */
    if (value.buffer instanceof Buffer) {
      return value.buffer;
    }

    /* istanbul ignore next */
    return Buffer.from(value);
  }

  override compareAsType(): string {
    return 'Buffer';
  }

  override ensureComparable(): boolean {
    return false;
  }

  override getColumnType(prop: EntityProperty, platform: Platform): string {
    return platform.getBlobDeclarationSQL();
  }

}
