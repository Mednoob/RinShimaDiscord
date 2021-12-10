import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("afk")
export class AFK {
    @ObjectIdColumn()
    public _id!: ObjectID;

    @Column("string")
    public userId!: string;

    @Column("string")
    public guildId!: string;

    @Column()
    public reason?: string;

    @Column()
    public attachment?: string;

    @Column("number")
    public since!: number;
}
