import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("prefix")
export class Prefix {
    @ObjectIdColumn()
    public _id!: string;

    @Column()
    public prefix!: string;
}
