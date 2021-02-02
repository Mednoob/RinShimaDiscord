module.exports = {
    name: "npm",
    description: "Shows info about NPM package",
    aliases: ["nodepackagemanager"],
    usage: "rin>npm <PackageName>",
    category: "Infos",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the name of the package you want to search"
        }});
        const PackageGet = await Rin.Npm.SearchPackage(Arguments.join("+"))

        if(!PackageGet.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Package not found"
        }});

        const Pkg = PackageGet[0]
        const DownloadCountLastDay = await Rin.Npm.PackagePointDownloadCounts(Pkg.package.name, "last-day")

        return Message.channel.send({embed: {
            color: "GREEN",
            title: Pkg.package.name,
            url: `https://npmjs.com/package/${Pkg.package.name}`,
            fields: [
                {
                    name: "Download Count",
                    value: `About ${require("pretty-num").prettyNum(DownloadCountLastDay.downloads, {thousandsSeparator: "."})} downloads on ${require("moment")(DownloadCountLastDay.end).format("DD/MM/YYYY")}`,
                    inline: true
                },
                {
                    name: "Keywords",
                    value: !Pkg.package.keywords ? "Unknown" : Pkg.package.keywords.map(x => `\`${x}\``).join(", "),
                    inline: true
                },
                {
                    name: "Author",
                    value: Rin.Npm.ParseName(Pkg),
                    inline: false
                },
                {
                    name: "Maintainers",
                    value: Pkg.package.maintainers.map(x => `\`${x.username}\``).join(", "),
                    inline: true
                }
            ]
        }})
    }
}