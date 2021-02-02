module.exports = {
    name: "totalcode",
    description: "Shows total of codes that my owner wrote inside me",
    aliases: [],
    usage: "rin>totalcode",
    category: "Infos",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        return require("glob")("src/**/*.js", async (err, files) => {
            let num = 0;
            let length = 0;
            let highestNum = 0;
            let highestLength = 0;
            let highestNumFile = "";
            let highestLengthFile = ""
	        let fileLength = files.length;
            await Promise.all(files.map(x => {
                const fileString = require("fs").readFileSync(x).toString()
                num = num + fileString.split("\n").length
                length = length + fileString.length
                if(fileString.split("\n").length > highestNum) {
                    highestNum = fileString.split("\n").length
                    highestNumFile = x.slice((x.lastIndexOf("/") - 1 >>> 0) + 2)
                }
                if(fileString.length > highestLength) {
                    highestLength = fileString.length
                    highestLengthFile = x.slice((x.lastIndexOf("/") - 1 >>> 0) + 2)
                }
                return null
            }))
            return Message.channel.send({embed: {
                color: "GREEN",
                description: "My owner has created about `" + fileLength.toString() + "` files. Written about `" + num.toString() +"` lines of codes and about `" + length.toString() +"` letters inside me.\n\nFile with the highest amount of lines is `" + highestNumFile.split(".")[0] + "` with about `" + highestNum.toString() + "` lines.\nFile with the highest amount of letters is `" + highestLengthFile.split(".")[0] + "` with about `" + highestLength + "` letters."
            }});
        })
    }
}