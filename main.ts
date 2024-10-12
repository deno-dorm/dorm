import {Configuration, defineConfig, Entity, PrimaryKey, MikroORM, Property} from '@dorm/core';
import {PostgreSqlDriver} from '@dorm/postgresql';
import {UserEntity} from "./entity/user.entity.ts";
import {SessionEntity} from "./entity/session.entity.ts";

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
        UserEntity,
        TestEntity,
        SessionEntity,
    ],
    allowGlobalContext: true,
});

const configObj = new Configuration(config);

const orm = await MikroORM.init(configObj);

const user = await orm.em.findOne(UserEntity, { id: 1 }, {
    populate: ['sessions']
});

console.log(user);

// Cleanup
orm.close();