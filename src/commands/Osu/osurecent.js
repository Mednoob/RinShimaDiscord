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

module.exports = {
    name: "osurecent",
    description: "Get recent play info of a player",
    aliases: ["osur"],
    usage: "rin>osurecent <mode> <username>",
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
            let Mode = ""
            let SoftMode = Rin.Osu.SoftModes[Arguments[0].toLowerCase()];
            if(!SoftMode) return Message.channel.send({embed: {
                color: "RED",
                description: "Invalid mode"
            }})
            
            Result = await Rin.Osu.Get.Recent(ArgsNick.join(" "), SoftMode)
            Mode = Rin.Osu.Modes[SoftMode]

            if(!Result.length) return Message.channel.send({embed: {
                color: "RED",
                description: "No recent play found for " + ArgsNick + " in " + Mode + " mode." 
            }});

            const FirstRes = Result[0]
            const BeatmapGet = await Rin.Osu.Get.Beatmap(FirstRes.beatmap_id)
            const UserGet = await Rin.Osu.Get.User(ArgsNick, SoftMode)
            const EmbDesc = `${SoftMode == "mania" ? `**Max count:** ${FirstRes["countgeki"]}
**300 count:** ${FirstRes["count300"]}
**200 count:** ${FirstRes["countkatu"]}
**100 count:** ${FirstRes["count100"]}
**50 count:** ${FirstRes["count50"]}
**Miss count:** ${FirstRes["countmiss"]}` : ""}${SoftMode == "std" ? `**300 count:** ${FirstRes["count300"]}
**100 count:** ${FirstRes["count100"]}
**50 count:** ${FirstRes["count50"]}
**Miss count:** ${FirstRes["countmiss"]}` : ""}${SoftMode == "ctb" ? `**Fruit count:** ${FirstRes["count300"]}
**Drop count:** ${FirstRes["count100"]}
**Droplet count:** ${FirstRes["count50"]}
**Missed Fruit and Drop count:** ${FirstRes["countmiss"]}
**Missed Droplet count:** ${FirstRes["countkatu"]}` : ""}${SoftMode == "taiko" ? `**Great(良) count:** ${FirstRes["countgeki"]}
**Good(可) count:** ${FirstRes["count300"]}
**Miss/Bad(不可) count:** ${FirstRes["countmiss"]}` : ""}`
            let Accuracy;
            switch(Mode) {
                case "Standard":
                    Accuracy = parseFloat(Rin.Util.osuStdCountAccuracy(parseInt(FirstRes["count300"]), parseInt(FirstRes["count100"]), parseInt(FirstRes["count50"]), parseInt(FirstRes["countmiss"])) * 100).toFixed(2)
                    break;
                case "Catch The Beat":
                    Accuracy = parseFloat(Rin.Util.osuCatchCountAccuracy(parseInt(FirstRes["count300"]), parseInt(FirstRes["count100"]), parseInt(FirstRes["count50"]), parseInt(FirstRes["countmiss"]), parseInt(FirstRes["countkatu"])) * 100).toFixed(2)
                    break;
                case "Taiko":
                    Accuracy = parseFloat(Rin.Util.osuTaikoCountAccuracy(parseInt(FirstRes["count300"]), parseInt(FirstRes["count100"]), parseInt(FirstRes["countmiss"])) * 100).toFixed(2)
                    break;
                case "Mania":
                    Accuracy = parseFloat(Rin.Util.osuManiaCountAccuracy(parseInt(FirstRes["countgeki"]), parseInt(FirstRes["count300"]), parseInt(FirstRes["countkatu"]), parseInt(FirstRes["count100"]), parseInt(FirstRes["count50"]), parseInt(FirstRes["countmiss"])) * 100).toFixed(2)
                    break;
            }

            const frontMsg = await Message.channel.send({embed: {
                color: "GREEN",
                title: `${UserGet[0].username} score on ${BeatmapGet[0].title}[${BeatmapGet[0].version}] [${parseFloat(BeatmapGet[0].difficultyrating).toFixed(2)}✫]`,
                description: `**Mode:** ${Mode}
**Accuracy:** ${Accuracy}%
**Rank:** ${Ranks[FirstRes.rank]}
**PP:** ${parseInt(await Rin.Osu.CalculatePP(FirstRes))}pp
**Mods:** ${FirstRes.enabled_mods == "0" ? "None" : Rin.Osu.ResolveMod(parseInt(FirstRes.enabled_mods)).join(", ")}

${EmbDesc}`,
                thumbnail: {
                    url: `https://b.ppy.sh/thumb/${BeatmapGet[0].beatmapset_id}l.jpg`
                },
                footer: {
                    text: "React to download the beatmap. Played on"
                },
                timestamp: new Date(FirstRes.date).getTime()
            }})
            const collector = frontMsg.createReactionCollector((Reaction, User) => User.id == Message.author.id)
            collector.on("collect", (Reaction, User) => {
                return collector.stop("download")
            })
            collector.on("end", async (collected, reason) => {
                if(reason == "download") {
                    await Message.channel.send({embed: {
                        color: "GREEN",
                        description: "Please wait..."
                    }});
                    try {
                        return Message.channel.send(Message.author.toString(), new (require("discord.js").MessageAttachment)(`https://osu.ppy.sh/osu/${BeatmapGet[0].beatmap_id}`, "beatmap.osu"))
                    } catch (e) {
                        return Message.channel.send(Message.author.toString(), {embed: {
                            color: "RED",
                            description: `An Error Occured\n\`\`\`${e}\`\`\``
                        }})
                    }
                }
            })
        } catch (Err) {
            Message.channel.send({embed: {
                color: "RED",
                description: `There was an error while trying to do the search\n\`\`\`${Err}\`\`\``
            }})
        }
    }
}