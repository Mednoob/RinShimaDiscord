import typegoose from "@typegoose/typegoose";

const { getModelForClass, prop } = typegoose;

class Data {
    @prop()
    public msg?: string;

    @prop()
    public channelId?: string;

    @prop()
    public enabled?: boolean;
}

export class WelcomeGoodbye {
    @prop({ required: true, unique: true })
    public guildId!: string;

    @prop()
    public welcome?: Data;

    @prop()
    public goodbye?: Data;
}

export default getModelForClass(WelcomeGoodbye, {
    schemaOptions: {
        collection: "welcome-goodbye"
    }
});
