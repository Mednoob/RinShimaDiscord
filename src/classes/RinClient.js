const { Client, Collection } = require("discord.js")
const { Token } = require("../config/Token.json")
const RinUtil = require("./RinUtil")
const { Entry: Nekos } = require("./api/src/Nekos")
const { Entry: Lolis } = require("./api/src/Lolis")
const { Entry: Osu } = require("./api/src/Osu")
const { Entry: Danbooru } = require("./api/src/Danbooru")
const { Entry: NHentai } = require("./api/src/NHentai")
const { Entry: Npm } = require("./api/src/Npm")
const { Entry: Rule } = require("./api/src/Rule34")
const { Entry: Mojang } = require("./api/src/Mojang")
const Japanese = require("./Japanese")
const Welcomer = require("./Welcomer")
const Enmap = require("enmap")
const PrettyMs = require("pretty-ms")
const Fs = require("fs")

/**
 * @class RinClient
 */
module.exports = class RinClient extends Client {
    constructor() {
        super({ 
            disableMentions: "everyone", 
            partials: ["MESSAGE", "GUILD_MEMBER", "REACTION", "CHANNEL"], 
            fetchAllMembers: true
        })
        
        this.Commands = new Collection()
        this.Aliases = new Collection()
        this.Events = new Collection()
        this.Cooldowns = new Map()
        this.GuildPrefixes = new Enmap({ name: "GuildPrefixes" })
        this.GuildWelcomes = new Enmap({ name: "GuildWelcomes" })
        this.GuildGoodbyes = new Enmap({ name: "GuildGoodbyes" })
        this.MarryData = new Enmap({ name: "MarryData" })
        this.MarryIgnores = new Enmap({ name: "MarryIgnores" })
        this.EveryoneLogs = new Enmap({ name: "EveryoneLogs" })
        this.CommandBans = new Enmap({ name: "CommandBans" })
        this.AfkData = new Enmap({ name: "AfkData" })
        this.JtcData = new Enmap({ name: "JtcData" })
        this.OnGoingJtcData = new Enmap({ name: "OnGoingJtcData" })
        this.CustomResponds = new Enmap({ name: "CustomResponds" })
        this.GlobalChatData = new Enmap({ name: "GlobalChatData" })
	    this.Gallery = Fs.readdirSync("C:\\Users\\ahmad\\Pictures")
	    this.GalleryDir = "C:\\Users\\ahmad\\Pictures"
        this.Categories = new Collection()
        this.DefaultPrefix = "rin>"
        this.musicManage = null
        this.config = require("../config/LavalinkNode.json")
        this.Package = require("../../package.json")
        this.Util = new RinUtil()
        this.Nekos = new Nekos()
        this.Lolis = new Lolis()
        this.Osu = new Osu(this)
        this.Danbooru = new Danbooru(this)
        this.DateNow = Date.now()
        this.Rule34 = new Rule(this)
        this.NHentai = new NHentai(this)
        this.Mojang = new Mojang(this)
        this.Npm = new Npm(this)
        this.Japanese = new Japanese()
        this.Welcomer = new Welcomer(this)
        /**
         * @param {string} Text 
         * @param {import("discord.js").GuildMember} Member 
         * @returns {string} `string`
         */
        this.ReplacePlaceholder = (Text, Member) => {
            return Text
            .replace(/{user}/gi, Member.user.toString())
            .replace(/{server}/gi, Member.guild.name)
            .replace(/{tag}/gi, Member.user.tag)
            .replace(/{discrim}|{discriminator}/gi, Member.user.discriminator)
            .replace(/{username}|{usernomention}|{nomention}/gi, Member.user.username)
            .replace(/{size}|{amount}|{members}/gi, Member.guild.members.cache.size)
            .replace(/{createdTime}|{createTime}/gi, Member.user.createdAt)
            .replace(/{createdAgo}|{createAgo}/gi, PrettyMs(Date.now() - Member.user.createdTimestamp, { verbose: true }))
        }
        this.hastebin = async(text) => {
            const { key } = await this.Util.REST("https://haste.nezukochan.xyz/documents", "POST", text)
            return `https://haste.nezukochan.xyz/${key}`
          }
    }
    log_in() {
        this.login(Token)
    }
}