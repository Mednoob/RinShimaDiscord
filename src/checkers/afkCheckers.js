const { MessageEmbed } = require("discord.js")

/**
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").Message} Message 
 */
module.exports = async (Rin, Message) => {
    if(Message.author.bot) return;
    const AuthorAfkData = Rin.AfkData.get(`${Message.guild.id}_${Message.author.id}`)
    if(AuthorAfkData) {
            if(Message.content.endsWith("--pass")) {

            } else {
            Rin.AfkData.delete(`${Message.guild.id}_${Message.author.id}`)
            Message.channel.send({embed: {
                color: "GREEN",
                description: `Welcome back, ${Message.author.toString()}`
            }}).then(x => x.delete({ timeout: 5000 }));
            }
    }

    for(let x of Rin.AfkData.array()) {
        if(Message.mentions.users.has(x.AuthorID)) {
            if(Message.guild.id == x.GuildID) {
                const Embed = new MessageEmbed()
                .setColor("YELLOW")
                .setTitle(`${Rin.users.cache.has(x.AuthorID) ? Rin.users.cache.get(x.AuthorID).tag : (await Rin.users.fetch(x.AuthorID)).tag} is currently AFK`)
                .addField("Reason", x.Reason, true)
                .setImage(x.Attachment);
                Message.channel.send(Embed).then(x => x.delete({ timeout: 5000 }))
            }
        }
    }
}