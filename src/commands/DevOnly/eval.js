const { MessageEmbed } = require("discord.js");
const choice = ["🚫"];
const ownerID = ["366169273485361153", "543698101886779413"]

module.exports = {
 name: "eval",
 aliases: ["e","ev"],
 description: "Evaluate javascript code",
 usage:"eval <code>",
 category: "DevOnly",
 cooldown: 3000,
 /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
  */
 run: async (Rin, Message, Arguments) => {
  const Bot = Rin;
  const Msg = Message;
  
  const { args, flags } = parseQuery(Arguments);
  try {
    if(!ownerID.includes(Message.author.id)) return Message.channel.send('Only bot owner can use this');
    
    if (!args.length) {
      throw new TypeError(`Try ${module.exports.usage}`);
    }
    let code = args.join(" ");
    let depth = 0;
    if (flags.includes("async")) {
      code = `(async() => { ${code} })()`;
    }
    if (flags.some(x => x.includes("depth"))) {
      depth = flags.find(x => x.includes("depth")).split("=")[1];
      depth = parseInt(depth, 10);
    }
    const before = Date.now()
    let { evaled, type } = await parseEval(eval(code)); /* eslint-disable-line */
    const timeRes = Date.now() - before
    if (flags.includes("silent")) return;
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
    evaled = evaled
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);
    if (evaled.length > 1024) evaled = await Rin.hastebin(evaled);
    else evaled = `\`\`\`${evaled}\`\`\``;
    const embed = new MessageEmbed()
      .setAuthor("Evaled success | " + require("pretty-ms")(timeRes))
      .setColor("GREEN")
      .setDescription(evaled)
      .addField("Type", `\`\`\`${type}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await Message.channel.send(embed);
    for (const chot of choice) {
      await m.react(chot);
    }
    const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === Message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
    });
  } catch (e) {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor("Evaled error")
      .setDescription(`\`\`\`${e}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await Message.channel.send(embed);
    for (const chot of choice) {
      await m.react(chot);
    }
    const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === Message.author.id;
    m.createReactionCollector(filter, { time: 60000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
    });
  }
}
}

async function parseEval(input) {
  const isPromise =
    input instanceof Promise &&
    typeof input.then === "function" &&
    typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return {
      evaled: input,
      type: `Promise<${parseType(input)}>`
    };
  }
  return {
    evaled: input,
    type: parseType(input)
  };
}

function parseType(input) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";
    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }
    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined ? "Void" : input.constructor.name;
}

function parseQuery(queries) {
  const args = [];
  const flags = [];
  for (const query of queries) {
    if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
    else args.push(query);
  }
  return { args, flags };
}
MessageEmbed