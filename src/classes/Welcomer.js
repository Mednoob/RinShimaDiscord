class Welcomer {

    /**
     * @param {import("./RinClient")} Rin 
     */
    constructor(Rin) {
        this.Rin = Rin
    }

    render = {
        /**
         * @param {import("discord.js").User} user
         * @param {string} imageUrl
         */
        designOne: async (user, imageUrl = "", tagFillColor = "#ffffff", avaOutlineColor = "#ffffff", titleFillColor = "#ffffff", descFillColor = "#ffffff") => {
            const   canv = require("canvas").createCanvas(720, 300),
                    contxt = canv.getContext("2d");
            let img;
            if(!imageUrl || imageUrl == "") {
                contxt.fillStyle = "#2C2F33"
                contxt.fillRect(0, 0, canv.width, canv.height)
            } else {
                const img = await require("canvas").loadImage(imageUrl)
                contxt.drawImage(img, 0, 0, canv.width, canv.height)
            }
            const outlineDiameter = 48
            contxt.beginPath()
            contxt.arc(((canv.width / 2) - (outlineDiameter / 2)) + 24, 75, outlineDiameter, 0, 2 * Math.PI)
            contxt.fillStyle = "#ffffff"
            contxt.fill()
            contxt.strokeStyle = "#ffffff"
            contxt.stroke()
            contxt.closePath()
            contxt.beginPath()
            contxt.arc(canv.width / 2, 82, 64, 0, 2 * Math.PI, true)
            contxt.closePath()
            contxt.clip()
            const userImg = await require("canvas").loadImage(user.displayAvatarURL({format: 'png', size: 64}))
            contxt.drawImage(userImg, (canv.width / 2) - (userImg.width / 2), 50)
            return canv.toBuffer("image/png")
        }
    }
}

module.exports = Welcomer