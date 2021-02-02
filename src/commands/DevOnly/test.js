const DevList = ["366169273485361153", "543698101886779413"]

module.exports = {
    name: "test",
    description: "Command used for testing under development features",
    aliases: [],
    usage: "rin>test",
    category: "DevOnly",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!DevList.includes(Message.author.id)) return Message.channel.send({embed: {
            color: "RED",
            description: "You're not my developer, Baaaaka!"
        }});

        return Rin.Osu.Get.UserBest("Mednoob", "std").then(async x => {
            const get = await Rin.Util.REST(`https://osu.ppy.sh/api/get_replay?k=${require("../../config/Osu.json").ApiKey}&b=${x[0].beatmap_id}&u=${x[0].user_id}`)
            return await Message.channel.send(atob(get.content))
        })

        return Rin.Osu.Get.UserBest("Mednoob", "std").then(async res => {
            const med = res[0]
            const beatmap = (await Rin.Osu.Get.Beatmap(med.beatmap_id))[0]

            try {
                const mapGet = await Rin.Util.REST(`https://osu.ppy.sh/osu/${beatmap.beatmap_id}`, "GET")
                console.log(typeof mapGet)
                const map = new (require("ojsama").parser)().feed(mapGet)
                map.mode = parseInt(map.mode || "0")
                const stars = new (require("ojsama").diff)().calc({
                map: map, 
                mods: parseInt(med.enabled_mods)
                })
                const uwu = require("ojsama").ppv2({
                    stars: stars,
                    combo: parseInt(med.maxcombo),
                    nmiss: parseInt(med.countmiss),
                    acc_percent: Rin.Util.osuStdCountAccuracy(parseInt(med.count300), parseInt(med.count100), parseInt(med.count50), parseInt(med.countmiss)),
                    mode: parseInt(beatmap.mode)
                }).computer_accuracy.toString()
                return Message.channel.send(uwu)
            } catch (e) {
                return Message.channel.send(e.message)
            }
        })
    }
}