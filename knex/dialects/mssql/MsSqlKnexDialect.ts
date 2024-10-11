import { MonkeyPatchable } from '../../MonkeyPatchable.ts';
import { MsSqlTableCompiler } from './MsSqlTableCompiler.ts';
import { MsSqlColumnCompiler } from './MsSqlColumnCompiler.ts';
import { MsSqlQueryCompiler } from './MsSqlQueryCompiler.ts';

export class MsSqlKnexDialect extends MonkeyPatchable.MsSqlDialect {

  tableCompiler() {
    // eslint-disable-next-line prefer-rest-params
    return new (MsSqlTableCompiler as any)(this, ...arguments);
  }

  columnCompiler() {
    // eslint-disable-next-line prefer-rest-params
    return new (MsSqlColumnCompiler as any)(this, ...arguments);
  }

  queryCompiler() {
    // eslint-disable-next-line prefer-rest-params
    return new (MsSqlQueryCompiler as any)(this, ...arguments);
  }

}
