import { MonkeyPatchable } from '../../MonkeyPatchable.ts';

export class MsSqlColumnCompiler extends MonkeyPatchable.MsSqlColumnCompiler {

  enu(this: any, allowed: unknown[]) {
    return `nvarchar(100) check (${this.formatter.wrap(this.args[0])} in ('${(allowed.join("', '"))}'))`;
  }

}
