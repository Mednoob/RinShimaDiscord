module.exports = {
    name: "contributors",
    description: "Show this bot contributors and open sources that this bot uses",
    aliases: ["contrs", "contributor", "contr", "opensource", "opensources"],
    usage: "rin>credit",
    category: "Infos",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        Message.channel.send({embed: {
            color: "GREEN",
            title: `${Rin.user.username} Contributors and Open Sources`,
            description: `I want to say thanks to these contributors, open source projects, and discord servers that helped my owner (${Rin.users.cache.get("366169273485361153").username}) on building a bot like me. Here's the list of them.`,
            fields: [
                {
                    name: "Contributors",
                    value: `**${Rin.users.cache.get("543698101886779413").username}:** Second Owner
**${Rin.users.cache.get("499021389572079620").username}:** Helping my owner on setting up lavalink server`,
                    inline: true
                },
                {
                    name: "Open Sources",
                    value: `**[Lavalink and Music Commands](https://github.com/AlvvxL/lavalink-musicbot/)**
**[Handlers](https://github.com/SharifPoetra/yumeko)**`,
                    inline: false
                },
                {
                    name: "Discord Servers",
                    value: `**[Zhycorp](https://discord.gg/zhycorp)**
**[Not A 開発者](https://notadev.xyz/discord)**`,
                    inline: false
                },
                {
                    name: "Packages",
                    value: Object.keys(Rin.Package.dependencies).map(x => `\`${x}\``).join(", "),
                    inline: false
                }
            ]
        }})
    }
}