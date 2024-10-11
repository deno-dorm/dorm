import type { Dictionary } from '../typings.ts';
import { DriverException } from '../exceptions.ts';

export class ExceptionConverter {

  /* istanbul ignore next */
  convertException(exception: Error & Dictionary): DriverException {
    return new DriverException(exception);
  }

}
