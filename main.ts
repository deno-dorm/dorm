import {defineConfig, Configuration, Entity, PrimaryKey} from '@dorm/core';
import {PostgreSqlDriver} from '@dorm/postgresql';
import {MikroORM} from "./postgresql/mod.ts";

export function add(a: number, b: number): number {
    return a + b;
}

@Entity({tableName: 'test'})
class TestEntity {

    @PrimaryKey()
    id!: number;

}

const config = defineConfig({
    debug: true,
    driver: PostgreSqlDriver,
    dbName: 'test',
    entities: [TestEntity]
});



const configObj = new Configuration(config);

MikroORM.init(configObj)

console.log(configObj.getAll());

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Add 2 + 3 =", add(2, 3));
}
