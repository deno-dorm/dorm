import { MySqlKnexDialect } from './MySqlKnexDialect.ts';

export class MariaDbKnexDialect extends MySqlKnexDialect {

  get driverName() {
    return 'mariadb';
  }

  _driver() {
    return import('mariadb/callback');
  }

  validateConnection(connection: any) {
    return connection.isValid();
  }

}
