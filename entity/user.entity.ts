import { Collection, Entity, PrimaryKey, Property } from "@dorm/core";
import { OneToMany } from "../core/decorators/index.ts";
import { SessionEntity } from "./session.entity.ts";

@Entity({ tableName: "auth_user" })
export class UserEntity {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @OneToMany(() => SessionEntity, session => session.user)
    sessions = new Collection<SessionEntity>(this);
}
