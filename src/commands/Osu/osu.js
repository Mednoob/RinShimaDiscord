const { Entry } = require("../../classes/api/src/Osu")
const OsuEntry = new Entry()
const PrettyNum = require("pretty-num").prettyNum
const PrettyMs = require("pretty-ms")
const { prettyNum } = require("pretty-num")

module.exports = {
    name: "osu",
    description: "Retrieve osu player stats",
    aliases: [],
    usage: "rin>osu <mode> <username>",
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
            description: "Please, give me the mode and username to search"
        }});
        
        if(!Arguments[1]) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the username to search"
        }});

        try{
            const ArgsNick = Arguments.slice(1, Arguments.length + 1)
            let Result = []
            let Mode = ""
            let SoftMode = Rin.Osu.SoftModes[Arguments[0].toLowerCase()];
            if(!SoftMode) return Message.channel.send({embed: {
                color: "RED",
                description: "Invalid mode"
            }})
            
            Result = await Rin.Osu.Get.User(ArgsNick.join(" "), SoftMode)
            Mode = Rin.Osu.Modes[SoftMode]
            
            const FirstRes = Result[0]

            return Message.channel.send({embed: {
                color: "GREEN",
                title: `${FirstRes.username}(${FirstRes.user_id}) Stats`,
                description: `**Mode:** ${Mode}`,
                thumbnail: {
                    url: `http://s.ppy.sh/a/${FirstRes.user_id}`
                },
                fields: [
                {
                    name: "-----> Player Stats <-----",
                    value: `**Play Count:** ${PrettyNum(parseFloat(FirstRes.playcount), {thousandsSeparator: "."})}
**PP:** ${PrettyNum(parseInt(FirstRes.pp_raw), {thousandsSeparator: "."})}
**Accuracy:** ${parseFloat(FirstRes.accuracy).toFixed(2)}%
**Join Date:** ${require("moment")(new Date(FirstRes.join_date)).format("DD/MM/YYYY hh:mm:ss")}`,
                    inline: true
                },
                {
                    name: "-----> Rank <-----",
                    value: `**[Global] ${PrettyNum(parseInt(FirstRes.pp_rank), {thousandsSeparator: "."})}**
[${FirstRes.country}] ${PrettyNum(parseInt(FirstRes.pp_country_rank), {thousandsSeparator: "."})}`,
                    inline: false
                },
                {
                    name: "-----> Total Playtime <-----",
                    value: `${PrettyMs(parseInt(FirstRes.total_seconds_played) * 1000, { verbose: true })}`,
                    inline: false
                },
                {
                    name: "-----> Gameplay <-----",
                    value: `**Silver SS Count:** ${prettyNum(parseInt(FirstRes.count_rank_ssh), {thousandsSeparator: "."})}
**SS Count:** ${prettyNum(parseInt(FirstRes.count_rank_ss), {thousandsSeparator: "."})}
**Silver S Count:** ${prettyNum(parseInt(FirstRes.count_rank_sh), {thousandsSeparator: "."})}
**S Count:** ${prettyNum(parseInt(FirstRes.count_rank_s), {thousandsSeparator: "."})}
**A Count:** ${prettyNum(parseInt(FirstRes.count_rank_a), {thousandsSeparator: "."})}`,
                    inline: false
                },
                {
                    name: "-----> Recent Events <-----",
                    value: FirstRes.events.length > 0 ? Rin.Osu.ParseEvents(FirstRes.events).slice(0, 3).map((x, i) => `${i + 1}. ${x}`).join("\n") : "None",
                    inline: false
                }
                ]
            }})
    } catch (Err) {
        Message.channel.send({embed: {
            color: "RED",
            description: `There was an error while trying to do the search\n\`\`\`${Err}\`\`\``
        }})
    }
    }
}