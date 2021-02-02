module.exports = {
    name: "hiraganaquiz",
    description: "Gives you a hiragana quiz",
    aliases: ["hiraquiz"],
    usage: "rin>hiraganaquiz",
    category: "Japanese",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const keys = Object.keys(Rin.Japanese.hiragana)
        const letter = Rin.Japanese.hiragana[keys[Math.floor(Math.random() * keys.length)]]
        const answers = keys.filter(x => Rin.Japanese.hiragana[x] == letter)
        const hiraImg = Rin.Japanese.generateImage(letter)
        await Message.channel.send(new (require("discord.js").MessageEmbed)().attachFiles(new (require("discord.js").MessageAttachment)(hiraImg, "hiraquiz.png")).setImage("attachment://hiraquiz.png").setTitle("Hiragana Quiz").setDescription("You have 10 seconds to answer this quiz."))
        const collector = Message.channel.createMessageCollector(msg => msg.author.id == Message.author.id, {time: 10000})
        collector.on("collect", (msg) => {
            if(!answers.includes(msg.content.toLowerCase().trim())) return;
            else {
                collector.stop("correct")
            }
        })
        collector.on("end", (collected, reas) => {
            const parsed = Rin.Japanese.parseAnswers(answers)
            if(reas == "correct") return Message.channel.send(Message.author.toString(), {
                embed: {
                    color: "GREEN",
                    description: `Correct! ${parsed}`
                }
            });
            else return Message.channel.send(Message.author.toString(), {
                embed: {
                    color: "RED",
                    description: `Time's up! ${parsed}`
                }
            })
        })
    }
}