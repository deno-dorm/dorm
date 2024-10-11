import {Entity, PrimaryKey, Property} from "@dorm/core";

@Entity({tableName: 'test'})
export class OtherTestEntity {

    @PrimaryKey()
    id!: number;


    @Property()
    name!: string;

}