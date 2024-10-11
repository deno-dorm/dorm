# dORM

A fork of MikroORM for Deno. Currently, extremely unstable.

It only supports:
- Typescript
- PostgreSQL
- Manual configuration
- TSMorph metadata provider
- No metadata cache
- No bundling

Example usage:
```ts
import {Configuration, defineConfig, Entity, PrimaryKey, MikroORM, Property} from '@dorm/core';
import {PostgreSqlDriver} from '@dorm/postgresql';

@Entity({ tableName: "test" })
class TestEntity {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;
}

const config = defineConfig({
    debug: true,
    driver: PostgreSqlDriver,
    password: "postgres",
    dbName: "postgres",
    entities: [
        TestEntity,
    ],
    allowGlobalContext: true,
});

const configObj = new Configuration(config);

const orm = await MikroORM.init(configObj);

console.log(await orm.em.find(TestEntity, { id: 1 }));

// Cleanup
orm.close();
```