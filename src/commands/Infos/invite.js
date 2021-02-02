module.exports = {
    name: "invite",
    description: "Shows the list of my invite links",
    aliases: ["inv"],
    usage: "rin>invite",
    category: "Infos",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        return Message.channel.send({embed: {
            color: "GREEN",
            title: `${Rin.user.username} invite links`,
            description: `You want to invite me to your server? [Here's the link](${await Rin.generateInvite({permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "SPEAK", "KICK_MEMBERS", "BAN_MEMBERS", "ATTACH_FILES", "ADD_REACTIONS"]})})
            
Wondering if I'm in another platform? Outside discord, I'm also available on [Guilded](https://www.guilded.gg/profile/o4PgB0GA) (Still in development phase).`
        }})
    }
}