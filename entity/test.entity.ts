import {Entity, Property, PrimaryKey} from "@dorm/core";

@Entity({tableName: 'test'})
export class TestEntity {

    @PrimaryKey()
    id!: number;


    @Property()
    name!: string;

}