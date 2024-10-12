import {Entity, PrimaryKey} from "@dorm/core";
import {ManyToOne} from "../core/decorators/index.ts";
import type { UserEntity } from "./user.entity.ts";

@Entity({tableName: 'auth_session'})
export class SessionEntity {

    @PrimaryKey()
    id!: number;

    @ManyToOne()
    user!: UserEntity;
}