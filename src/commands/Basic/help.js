const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Show the command list or detail of a command",
    aliases: ["h", "?", "cmd", "modules"],
    usage: "rin>help [CommandName]",
    category: "Basic",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const Pref =  Rin.GuildPrefixes.get(Message.guild.id) ? Rin.GuildPrefixes.get(Message.guild.id) : Rin.DefaultPrefix
        if(!Arguments.length) {
            const Categories = Rin.Categories.array()
            const Embed = new MessageEmbed()
            .setTitle("Command List")
            .setColor("BLUE")
            .setDescription("Use `" + Pref + "help <Command Name>` for more info about command")

            for(const Cat of Categories) {
                Embed.addField(Rin.Categories.findKey(x => x == Cat), Cat.map(x => `\`${x.split(".")[0]}\``).join(", "))
            }

            if(!Message.guild || Message.channel.type == "dm") return Message.channel.send(Embed);
            if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send(Embed);
            return Message.channel.send(Embed)
        } else {
            const Command = Rin.Commands.get(Arguments[0]) || Rin.Aliases.get(Arguments[0])
            if(!Command) return Message.channel.send({embed: {
                color: "RED",
                description: "Command not found"
            }});
            const CommandNameSplit = Command.name.split("")
            let CommandNameArray = []
            CommandNameSplit.forEach(x => CommandNameSplit.indexOf(x) == 0 ? CommandNameArray.push(x) : CommandNameArray.push(x))
            const CommandName = CommandNameArray.join("")

            const Embed = {embed: {
                title: `${CommandName} Command`,
                description: Command.description,
                fields: [
                    {
                        name: "Usage",
                        value: Command.usage.replace(/rin>/gi, Pref),
                        inline: true
                    },
                    {
                        name: "Category",
                        value: Command.category,
                        inline: true
                    },
                    {
                        name: "Aliases",
                        value: Command.aliases.length > 0 ? Command.aliases.map(x => `\`${x}\``).join(", ") : "This command has no aliases",
                        inline: false
                    }
                ]
            }}

            if(!Message.guild || Message.channel.type == "dm") return Message.channel.send(Embed);
            if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send(Embed);
            return Message.channel.send(Embed)
        }
    }
}