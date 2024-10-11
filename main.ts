import {defineConfig, Configuration} from '@dorm/core';
import {PostgreSqlDriver} from '@dorm/postgresql';

export function add(a: number, b: number): number {
    return a + b;
}

const config = defineConfig({
    debug: true,
    driver: new Error(),
});

const configObj = new Configuration(config);

console.log(configObj.getAll());

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Add 2 + 3 =", add(2, 3));
}
