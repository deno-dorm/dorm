import {Entity, PrimaryKey, Property} from "@dorm/core";

@Entity({tableName: 'test2'})
export class OtherTestEntity {

    @PrimaryKey()
    id!: number;


    @Property()
    name!: string;

}