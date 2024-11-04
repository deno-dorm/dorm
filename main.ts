import {MikroORM} from '@dorm/core';
import {PostgreSqlDriver} from '@dorm/postgresql';
import {UserEntity} from "./entity/user.entity.ts";
import {SessionEntity} from "./entity/session.entity.ts";

const orm = await MikroORM.init({
    debug: true,
    driver: PostgreSqlDriver,
    password: "postgres",
    dbName: "postgres",
    entities: [
        UserEntity,
        SessionEntity,
    ],
    allowGlobalContext: true,
});

const user = await orm.em.findOne(UserEntity, { id: 1 }, {
    populate: ["sessions"],
});

console.log(user);

// Cleanup
orm.close();
