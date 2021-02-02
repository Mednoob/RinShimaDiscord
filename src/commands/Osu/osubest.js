module.exports = {
    name: "osubest",
    description: "Retrieve top 10 plays of an osu! player",
    aliases: ["osub"],
    usage: "rin>osubest <mode> <username>",
    category: "Osu",
    cooldown: 7000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the mode and username"
        }});
        
        if(!Arguments[1]) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the username to search"
        }});

        try {
            const ArgsNick = Arguments.slice(1, Arguments.length + 1)
            let Result = []
            let Mode = "";
            let SoftMode = Rin.Osu.SoftModes[Arguments[0].toLowerCase()];
            if(!SoftMode) return Message.channel.send({embed: {
                color: "RED",
                description: "Invalid mode"
            }})
            
            Result = await Rin.Osu.Get.UserBest(ArgsNick.join(" "), SoftMode)
            Mode = Rin.Osu.Modes[SoftMode]

            if(!Result.length) return Message.channel.send({embed: {
                color: "RED",
                description: "No top plays found for" + ArgsNick + " in " + Mode + " mode." 
            }});

            return InitializeTopPlays(Rin, Message, Result, Mode, SoftMode)
        } catch (Err) {
            return Message.channel.send({embed: {
                color: "RED",
                description: "```" + Err + "```"
            }})
        }
    }
}

const Ranks = {
    XH: "Silver SS",
    X: "SS",
    SH: "Silver S",
    S: "S",
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "Failed"
}

/**
 * 
 * @param {import("../../classes/RinClient")} Rin 
 * @param {import("discord.js").Message} Message 
 * @param {Object[]} Results 
 * @param {string} Results.beatmap_id
 * @param {string} Results.score_id
 * @param {string} Results.score
 * @param {string} Results.maxcombo
 * @param {string} Results.count50
 * @param {string} Results.count100
 * @param {string} Results.count300
 * @param {string} Results.countmiss
 * @param {string} Results.countkatu
 * @param {string} Results.countgeki
 * @param {"1"|"0"} Results.perfect
 * @param {string} Results.enabled_mods
 * @param {string} Results.user_id
 * @param {string} Results.date
 * @param {string} Results.rank
 * @param {string} Results.pp
 * @param {"1"|"0"} Results.replay_available
 * @param {"Standard"|"Catch The Beat"|"Taiko"|"Mania"} Mode 
 * @param {"std"|"ctb"|"taiko"|"mania"} SoftMode
 */
async function InitializeTopPlays(Rin, Message, Results, Mode, SoftMode) {
    let current_page = 0
    let array = await Test(Rin, Results)
    let get_user = await Rin.Osu.Get.User(Results[current_page].user_id, SoftMode)
    let user = get_user[0]
    let Embed = new (require("discord.js").MessageEmbed)();
    Embed.setTitle(`${user.username} score on ${array[current_page].title}[${array[current_page].version}] [${parseFloat(array[current_page].difficultyrating).toFixed(2)}✫]`)
    Embed.setDescription(`**Mode:** ${Mode}
${await ResolveResultString(Rin, Results[current_page], Mode)}`)
    Embed.setThumbnail(`https://b.ppy.sh/thumb/${array[current_page].beatmapset_id}l.jpg`)
    Embed.setColor("GREEN")
    Embed.setFooter(`Page ${current_page + 1} / ${Results.length}`)
    Embed.setURL(ResolveScoreURL(Results[current_page].score_id, Mode))
    const TopMessage = await Message.channel.send(Embed)
    await TopMessage.react("⬅️")
    await TopMessage.react("➡️")
    const TopCollector = TopMessage.createReactionCollector((Reaction, User) => User.id == Message.author.id)
    TopCollector.on("collect", async (Reaction, User) => {
        if(Reaction.emoji.name.includes("➡️")) {
            current_page = current_page + 1
            if(current_page >= Results.length) current_page = 0;
            Embed.setTitle(`${user.username} score on ${array[current_page].title}[${array[current_page].version}] [${parseFloat(array[current_page].difficultyrating).toFixed(2)}✫]`)
            Embed.setDescription(`**Mode:** ${Mode}
${await ResolveResultString(Rin, Results[current_page], Mode)}`)
            Embed.setThumbnail(`https://b.ppy.sh/thumb/${array[current_page].beatmapset_id}l.jpg`)
            Embed.setFooter(`Page ${current_page + 1} / ${Results.length}`)
            Embed.setURL(ResolveScoreURL(Results[current_page].score_id, Mode))
            return TopMessage.edit(Embed)
        } else if(Reaction.emoji.name.includes("⬅️")) {
            if(current_page == 0) current_page = Results.length
            current_page = current_page - 1
            Embed.setTitle(`${user.username} score on ${array[current_page].title}[${array[current_page].version}] [${parseFloat(array[current_page].difficultyrating).toFixed(2)}✫]`)
            Embed.setDescription(`**Mode:** ${Mode}
${await ResolveResultString(Rin, Results[current_page], Mode)}`)
            Embed.setThumbnail(`https://b.ppy.sh/thumb/${array[current_page].beatmapset_id}l.jpg`)
            Embed.setFooter(`Page ${current_page + 1} / ${Results.length}`)
            Embed.setURL(ResolveScoreURL(Results[current_page].score_id, Mode))
            return TopMessage.edit(Embed)
        }
    })
}

/**
 * 
 * @param {import("../../classes/RinClient")} Rin
 * @param {Object} Result 
 * @param {string} Result.beatmap_id
 * @param {string} Result.score_id
 * @param {string} Result.score
 * @param {string} Result.maxcombo
 * @param {string} Result.count50
 * @param {string} Result.count100
 * @param {string} Result.count300
 * @param {string} Result.countmiss
 * @param {string} Result.countkatu
 * @param {string} Result.countgeki
 * @param {"1"|"0"} Result.perfect
 * @param {string} Result.enabled_mods
 * @param {string} Result.user_id
 * @param {string} Result.date
 * @param {string} Result.rank
 * @param {string} Result.pp
 * @param {"1"|"0"} Result.replay_available
 * @param {"Standard"|"Catch The Beat"|"Taiko"|"Mania"} Mode 
 */
async function ResolveResultString(Rin, Result, Mode) {
    const mods = Rin.Osu.ResolveMod(parseInt(Result.enabled_mods))
    if(Mode == "Standard") return `**Accuracy:** ${parseFloat(Rin.Util.osuStdCountAccuracy(parseInt(Result["count300"]), parseInt(Result["count100"]), parseInt(Result["count50"]), parseInt(Result["countmiss"])) * 100).toFixed(2)}%
**Rank:** ${Ranks[Result.rank]}
**PP:** ${parseInt(Result.pp)}pp
**Mods:** ${mods.length > 0 ? mods.join(", ") : "None"}

${ResolveResultScoreString(Result, "std")}
`;
else if(Mode == "Catch The Beat") return `**Accuracy:** ${parseFloat(Rin.Util.osuCatchCountAccuracy(parseInt(Result["count300"]), parseInt(Result["count100"]), parseInt(Result["count50"]), parseInt(Result["countmiss"]), parseInt(Result["countkatu"])) * 100).toFixed(2)}%
**Rank:** ${Ranks[Result.rank]}
**PP:** ${parseInt(Result.pp)}pp
**Mods:** ${mods.length > 0 ? mods.join(", ") : "None"}

${ResolveResultScoreString(Result, "ctb")}`;
else if(Mode == "Mania") return `**Accuracy:** ${parseFloat(Rin.Util.osuManiaCountAccuracy(parseInt(Result["countgeki"]), parseInt(Result["count300"]), parseInt(Result["countkatu"]), parseInt(Result["count100"]), parseInt(Result["count50"]), parseInt(Result["countmiss"])) * 100).toFixed(2)}%
**Rank:** ${Ranks[Result.rank]}
**PP:** ${parseInt(Result.pp)}pp
**Mods:** ${mods.length > 0 ? mods.join(", ") : "None"}

${ResolveResultScoreString(Result, "mania")}`;
else if(Mode == "Taiko") return `**Accuracy:** ${parseFloat(Rin.Util.osuTaikoCountAccuracy(parseInt(Result["count300"]), parseInt(Result["count100"]), parseInt(Result["countmiss"])) * 100).toFixed(2)}%
**Rank:** ${Ranks[Result.rank]}
**PP:** ${parseInt(Result.pp)}pp
**Mods:** ${mods.length > 0 ? mods.join(", ") : "None"}

${ResolveResultScoreString(Result, "taiko")}`;
}

/**
 * @param {Object} Result 
 * @param {string} Result.beatmap_id
 * @param {string} Result.score_id
 * @param {string} Result.score
 * @param {string} Result.maxcombo
 * @param {string} Result.count50
 * @param {string} Result.count100
 * @param {string} Result.count300
 * @param {string} Result.countmiss
 * @param {string} Result.countkatu
 * @param {string} Result.countgeki
 * @param {"1"|"0"} Result.perfect
 * @param {string} Result.enabled_mods
 * @param {string} Result.user_id
 * @param {string} Result.date
 * @param {string} Result.rank
 * @param {string} Result.pp
 * @param {"1"|"0"} Result.replay_available
 * @param {"std"|"ctb"|"taiko"|"mania"} SoftMode
 */
function ResolveResultScoreString(Result, SoftMode) {
    return `${SoftMode == "mania" ? `**Max count:** ${Result["countgeki"]}
    **300 count:** ${Result["count300"]}
    **200 count:** ${Result["countkatu"]}
    **100 count:** ${Result["count100"]}
    **50 count:** ${Result["count50"]}
    **Miss count:** ${Result["countmiss"]}` : ""}${SoftMode == "std" ? `**300 count:** ${Result["count300"]}
    **100 count:** ${Result["count100"]}
    **50 count:** ${Result["count50"]}
    **Miss count:** ${Result["countmiss"]}` : ""}${SoftMode == "ctb" ? `**Fruit count:** ${Result["count300"]}
    **Drop count:** ${Result["count100"]}
    **Droplet count:** ${Result["count50"]}
    **Missed Fruit and Drop count:** ${Result["countmiss"]}
    **Missed Droplet count:** ${Result["countkatu"]}` : ""}${SoftMode == "taiko" ? `**Great(良) count:** ${Result["countgeki"]}
    **Good(可) count:** ${Result["count300"]}
    **Miss/Bad(不可) count:** ${Result["countmiss"]}` : ""}`
}

/**
 * 
 * @param {string} ScoreID 
 * @param {"Standard"|"Catch The Beat"|"Taiko"|"Mania"} Mode 
 */
function ResolveScoreURL(ScoreID, Mode) {
    let ScoreMode = "";
    if(Mode == "Standard") ScoreMode = "osu";
    else if(Mode == "Catch The Beat") ScoreMode = "fruits";
    else if(Mode == "Mania") ScoreMode = "mania";
    else if(Mode == "Taiko") ScoreMode = "taiko";

    return `https://osu.ppy.sh/scores/${ScoreMode}/${ScoreID}`
}

async function Test(Rin, Results) {
    let array = Results
    let result = await Promise.all(array.map(async x => {
        const a = await Rin.Osu.Get.Beatmap(x.beatmap_id)
        return a[0]
    }))
    return result
}