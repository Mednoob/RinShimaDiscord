import typegoose from "@typegoose/typegoose";

const { getModelForClass, prop } = typegoose;

class Data {
    @prop()
    public message?: string;

    @prop()
    public channelId?: string;

    @prop()
    public enabled?: boolean;
}

class WelcomeGoodbye {
    @prop({ required: true, unique: true })
    public guildId!: string;

    @prop()
    public welcome?: Data;

    @prop()
    public goodbye?: Data;
}

export default getModelForClass(WelcomeGoodbye, {
    schemaOptions: {
        collection: "welcome"
    }
});
