const { MessageAttachment } = require("discord.js")
const Axios = require("axios").default

module.exports = {
    name: "pagespeed",
    description: "Testing the loading or fetching speed of a page using Google Pagespeed API",
    aliases: [],
    usage: "rin>pagespeed <url>",
    category: "Infos",
    cooldown: 20000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the url to be tested"
        }});
        Message.channel.startTyping()
        const PageSpeedGet = await Axios.get(`https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${Arguments[0].includes("http://") || Arguments[0].includes("https://") ? Arguments[0] : "https://" + Arguments[0]}`).catch(x => Message.channel.send({embed: {color: "RED", description: `\`\`\`${x}\`\`\``}}).then(() => Message.channel.stopTyping(true)))

        return Message.channel.send({embed: {
            color: "GREEN",
            title: "Pagespeed Result",
            description: `**Requested URL** ${PageSpeedGet.data.lighthouseResult.requestedUrl}
**Final URL** ${PageSpeedGet.data.lighthouseResult.finalUrl}
**[Speed Index](https://web.dev/speed-index/)** ${PageSpeedGet.data.lighthouseResult.audits["speed-index"].displayValue} (${parseFloat(PageSpeedGet.data.lighthouseResult.audits["speed-index"].displayValue.split(" ")[0]) <= 4.3 ? "Fast" : parseFloat(PageSpeedGet.data.lighthouseResult.audits["speed-index"].displayValue.split(" ")[0]) <= 5.8 ? "Moderate" : "Slow"})
**[Time to Interactive](https://web.dev/interactive/)** ${PageSpeedGet.data.lighthouseResult.audits.interactive.displayValue} (${parseFloat(PageSpeedGet.data.lighthouseResult.audits.interactive.displayValue.split(" ")[0]) <= 3.8 ? "Fast" : parseFloat(PageSpeedGet.data.lighthouseResult.audits.interactive.displayValue.split(" ")[0]) <= 7.3 ? "Moderate" : "Slow"})
**[Total Blocking Time](https://web.dev/lighthouse-total-blocking-time/)** ${PageSpeedGet.data.lighthouseResult.audits["total-blocking-time"].displayValue} (${parseInt(PageSpeedGet.data.lighthouseResult.audits["total-blocking-time"].displayValue.split(" ")[0]) <= 300 ? "Fast" : parseInt(PageSpeedGet.data.lighthouseResult.audits["total-blocking-time"].displayValue.split(" ")[0]) <= 600 ? "Moderate" : "Slow"})`
        }}).then(() => Message.channel.stopTyping(true))
    }
}