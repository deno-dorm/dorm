import { ArrayType } from './ArrayType.ts';
import { BigIntType } from './BigIntType.ts';
import { BlobType } from './BlobType.ts';
import { BooleanType } from './BooleanType.ts';
import { DateTimeType } from './DateTimeType.ts';
import { DateType } from './DateType.ts';
import { DecimalType } from './DecimalType.ts';
import { DoubleType } from './DoubleType.ts';
import { EnumArrayType } from './EnumArrayType.ts';
import { EnumType } from './EnumType.ts';
import { CharacterType } from './CharacterType.ts';
import { FloatType } from './FloatType.ts';
import { IntegerType } from './IntegerType.ts';
import { IntervalType } from './IntervalType.ts';
import { JsonType } from './JsonType.ts';
import { MediumIntType } from './MediumIntType.ts';
import { SmallIntType } from './SmallIntType.ts';
import { StringType } from './StringType.ts';
import { TextType } from './TextType.ts';
import { TimeType } from './TimeType.ts';
import { TinyIntType } from './TinyIntType.ts';
import { type IType, type TransformContext, Type } from './Type.ts';
import { Uint8ArrayType } from './Uint8ArrayType.ts';
import { UnknownType } from './UnknownType.ts';
import { UuidType } from './UuidType.ts';

export {
  Type, DateType, TimeType, DateTimeType, BigIntType, BlobType, Uint8ArrayType, ArrayType, EnumArrayType, EnumType,
  JsonType, IntegerType, SmallIntType, TinyIntType, MediumIntType, FloatType, DoubleType, BooleanType, DecimalType,
  StringType, UuidType, TextType, UnknownType, type TransformContext, IntervalType, type IType, CharacterType,
};

export const types = {
  date: DateType,
  time: TimeType,
  datetime: DateTimeType,
  bigint: BigIntType,
  blob: BlobType,
  uint8array: Uint8ArrayType,
  array: ArrayType,
  enumArray: EnumArrayType,
  enum: EnumType,
  json: JsonType,
  integer: IntegerType,
  smallint: SmallIntType,
  tinyint: TinyIntType,
  mediumint: MediumIntType,
  float: FloatType,
  double: DoubleType,
  boolean: BooleanType,
  decimal: DecimalType,
  character: CharacterType,
  string: StringType,
  uuid: UuidType,
  text: TextType,
  interval: IntervalType,
  unknown: UnknownType,
} as const;

export const t = types;
