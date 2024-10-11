import {defineConfig, Configuration} from '@dorm/core';
import {PostgreSqlDriver, Entity} from '@dorm/postgresql';

export function add(a: number, b: number): number {
    return a + b;
}

@Entity()
class TestEntity {
}

const config = defineConfig({
    debug: true,
    driver: PostgreSqlDriver,
    dbName: 'test',
    entities: [TestEntity]
});


const configObj = new Configuration(config);

console.log(configObj.getAll());

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Add 2 + 3 =", add(2, 3));
}
