module.exports = {
    name: "prefix",
    description: "Retrieve default prefix or set the Guild Prefix",
    aliases: ["pref"],
    usage: "rin>prefix [GuildPrefix]",
    category: "Guild",
    cooldown: 10000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const GuildPrefix = Rin.GuildPrefixes.get(Message.guild.id)
        let Pref;
        if(!GuildPrefix || GuildPrefix == undefined) {
            Pref = Rin.DefaultPrefix
        } else {
            Pref = GuildPrefix
        }
        const DefaultPrefixEmbed = {embed: {color: "GREEN", description: "My Prefix is " + Pref}}
        const DMSetGuildPrefixEmbed = {embed: {
            color: "RED",
            description: "Are you trying to set guild prefix from DM? Baaaaka!"
        }}
        const NoPermissionEmbed = {embed: {
            color: "RED",
            description: "You don't have `Manage Server` permission!"
        }}
        if(!Arguments.length) {
            if(Message.channel.type == "dm") return Message.channel.send(DefaultPrefixEmbed);
            if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send(DefaultPrefixEmbed);
            return Message.channel.send(DefaultPrefixEmbed)
        } else {
            const SuccessfulEmbed = {embed: {
                color: "GREEN",
                description: `Successfully changed the guild prefix to \`${Arguments[0]}\``
            }}
            if(Message.channel.type == "dm") return Message.channel.send(DMSetGuildPrefixEmbed);
            if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) {
                if(!Message.member.hasPermission("MANAGE_GUILD")) return Message.author.send(NoPermissionEmbed);
                Rin.GuildPrefixes.set(Message.guild.id, Arguments[0])
                return Message.author.send(SuccessfulEmbed);
            } else {
                if(!Message.member.hasPermission("MANAGE_GUILD")) return Message.channel.send(NoPermissionEmbed);
                Rin.GuildPrefixes.set(Message.guild.id, Arguments[0])
                return Message.channel.send(SuccessfulEmbed)
            }
        }
    }
}