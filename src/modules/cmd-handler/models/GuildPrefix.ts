import typegoose from "@typegoose/typegoose";

const { getModelForClass, prop } = typegoose;

class GuildPrefix {
    @prop({ required: true })
    public prefix!: string;
}

export default getModelForClass(GuildPrefix, {
    schemaOptions: {
        collection: "guildPrefixes"
    }
});
