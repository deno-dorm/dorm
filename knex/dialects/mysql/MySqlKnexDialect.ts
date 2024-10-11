import { MySqlQueryCompiler } from './MySqlQueryCompiler.ts';
import { MySqlColumnCompiler } from './MySqlColumnCompiler.ts';
import { MonkeyPatchable } from '../../MonkeyPatchable.ts';

export class MySqlKnexDialect extends MonkeyPatchable.MySqlDialect {

  queryCompiler() {
    // eslint-disable-next-line prefer-rest-params
    return new (MySqlQueryCompiler as any)(this, ...arguments);
  }

  columnCompiler() {
    // eslint-disable-next-line prefer-rest-params
    return new (MySqlColumnCompiler as any)(this, ...arguments);
  }

}
