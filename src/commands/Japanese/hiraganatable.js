module.exports = {
    name: "hiraganatable",
    description: "Shows Hiragana table",
    aliases: ["hiratable", "ht"],
    usage: "rin>hiraganatable",
    category: "Japanese",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        return Message.channel.send(new (require("discord.js").MessageEmbed)().setColor("GREEN").attachFiles(new (require("discord.js").MessageAttachment)("src/assets/japanese/Hiragana_Table_Fix.png", "Hiragana_Table.png")).setImage("attachment://Hiragana_Table.png").setFooter("Image taken from wikipedia").setTitle("Hiragana Table").setFooter("Blue arrows are indicating the steps to write the letter"))
    }
}