const CommandHandler = require("../handler/CommandHandler")

/**
 * @param {string[]} queries 
 */
function parseQuery(queries) {
    const args = [];
    const flags = [];
    for (const query of queries) {
      if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
      else args.push(query);
    }
    return { args, flags };
}

/**
 * 
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").Message} Message 
 */
module.exports = async (Rin, Message) => {
    if(Message.partial) await Message.fetch()
    require("fs").readdirSync("src/checkers/").filter(x => x.endsWith(".js") && x.startsWith("[all]")).forEach(y => require(`../checkers/${y}`)(Rin, Message))
    if(Message.author.bot) return;
    require("fs").readdirSync("src/checkers/").filter(x => x.endsWith(".js") && !x.startsWith("[all]")).forEach(y => require(`../checkers/${y}`)(Rin, Message))
    let Prefix;
    const GuildPrefix = Rin.GuildPrefixes.get(Message.guild.id)
    if(!GuildPrefix || GuildPrefix == undefined) {
        Prefix = Rin.DefaultPrefix
    } else {
        Prefix = GuildPrefix
    }

    if(Message.content == `<@${Rin.user.id}>` || Message.content == `<@!${Rin.user.id}>`) return Message.channel.send({embed: {
        color: "GREEN",
        description: `Hello! My prefix is \`${Prefix}\`!`
    }});

    if(!Message.content.startsWith(Prefix)) return;

    CommandHandler(Rin, Message, Prefix)
}