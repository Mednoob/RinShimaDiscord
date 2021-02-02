module.exports = {
    name: "reload",
    description: "Reload Command",
    aliases: [],
    usage: "rin>reload <command>",
    category: "DevOnly",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(Message.author.id != "366169273485361153") return Message.channel.send({embed: {
            color: "RED",
            description: "You're not my developer"
        }});
        const srcDir = require.main.filename.slice(0, require.main.filename.length - 6).replace(/\//g, "\\")
        if(Arguments[0] == "japanese") {
            delete(require.cache[srcDir + `classes\\Japanese.js`])
            Rin.Japanese = new (require("../../classes/Japanese"))()
            return Message.channel.send({embed: {
                color: "GREEN",
                description: "Japanese class reloaded!"
            }})
        }
        if(Arguments[0] == "welcomer") {
            delete(require.cache[srcDir + `classes\\Welcomer.js`])
            Rin.Welcomer = new (require("../../classes/Welcomer"))(Rin)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: "Welcomer class reloaded!"
            }})
        }
        const frontMsg = await Message.channel.send({embed: {
            color: "GREEN",
            description: "Reloading commands..."
        }});
        const entries = []
        const mainDir = require.main.filename.slice(0, require.main.filename.length - 10).replace(/\//g, "\\")
        Rin.test = mainDir
        Rin.Commands.forEach(x => {
            delete(require.cache[srcDir + `commands\\${x.category}\\${x.name}.js`])
            Rin.Commands.delete(x)
            x.aliases.forEach(y => Rin.Aliases.delete(y))
        })
        Rin.Commands.clear()
        Rin.Aliases.clear()
        await require("../../handler/CommandLoader")(Rin)
        await frontMsg.edit({embed: {
            color: "GREEN",
            description: "Command reloaded. Reloading Util, API Entries, and Package Info..."
        }});
        delete(require.cache[srcDir + `classes\\RinUtil.js`])
        delete(require.cache[mainDir + `package.json`])
        Rin.Package = require("../../../package.json")
        Rin.Util = new (require(srcDir + `classes\\RinUtil.js`))()
        require("fs").readdirSync("src/classes/api/src").forEach(y => {
            delete(require.cache[srcDir + `classes\\api\\src\\${y}`])
            const shortName = y.split(".")[0]
            Rin[shortName] = new (require(srcDir + `classes\\api\\src\\${y}`).Entry)(Rin)
            entries.push(shortName)
        });
        return frontMsg.edit({embed: {
            color: "GREEN",
            title: `Reload done!`,
            fields: [
                {
                    name: "Commands",
                    value: Rin.Commands.map(x => `\`${x.name}\``).join(", "),
                    inline: true
                },
                {
                    name: "API Entries",
                    value: entries.map(x => `\`${x}\``).join(", ")
                }
            ]
        }})
    }
}