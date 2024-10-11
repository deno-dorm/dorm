import {defineConfig, Configuration, Entity, PrimaryKey} from '@dorm/core';
import {PostgreSqlDriver} from '@dorm/postgresql';
import {MikroORM} from "./postgresql/mod.ts";
import {Property} from "./core/decorators/index.ts";
import { TestEntity } from "./entity/test.entity.ts";




@Entity({tableName: 'test2'})
class Test2Entity {

    @PrimaryKey()
    id!: number;


    @Property()
    name!: string;

}

const config = defineConfig({
    debug: true,
    driver: PostgreSqlDriver,
    password: 'postgres',
    dbName: 'postgres',
    entities: [TestEntity],
    allowGlobalContext: true,
});



const configObj = new Configuration(config);

const orm = await MikroORM.init(configObj);
console.log('connected from main');

console.log(await orm.em.find(TestEntity, {id: 1}));

// Cleanup
orm.close();
