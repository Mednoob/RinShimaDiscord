/**
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").Message} Message 
 */
module.exports = (Rin, Message) => {
    if(Message.author.bot) return;
    Rin.CustomResponds.array().forEach(x => {
        if(Message.content.toLowerCase() == x.Input.toLowerCase()) {
            if(Message.guild.id != x.GuildID) {

            } else {
                Message.channel.send(x.Output)
            }
        }
    })
}