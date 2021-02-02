const Axios = require("axios")
const { indexOf } = require("ffmpeg-static")
const BaseURL = "https://osu.ppy.sh/api"
const { ApiKey } = require("../../../config/Osu.json")

/**
 * @param {number} numOne 
 * @param {number} numTwo 
 */
function compareNumber(numOne, numTwo) {
    return numOne / numTwo
}

/**
 * @class Event
 */
class Event {
    /**
     * @param {Object} Data
     * @param {string} Data.display_html
     * @param {string} Data.beatmap_id
     * @param {string} Data.beatmapset_id
     * @param {string} Data.date
     * @param {string} Data.epicfactor
     */
    constructor(Data) {
        this.display_html = Data.display_html
        this.beatmap_id = Data.beatmap_id
        this.beatmapset_id  = Data.beatmapset_id
        this.date = Data.date
        this.epicfactor = Data.epicfactor
    }
}

class Beatmap {
    /**
     * @param {Object} BeatmapData 
     * @param {string} BeatmapData.beatmapset_id
     * @param {string} BeatmapData.beatmap_id
     * @param {"0"|"1"} BeatmapData.approved
     * @param {string} BeatmapData.total_length
     * @param {string} BeatmapData.hit_length
     * @param {string} BeatmapData.version
     * @param {string} BeatmapData.file_md5
     * @param {string} BeatmapData.diff_size
     * @param {string} BeatmapData.diff_overall
     * @param {string} BeatmapData.diff_approach
     * @param {string} BeatmapData.diff_drain
     * @param {"0"|"1"|"2"|"3"} BeatmapData.mode
     * @param {string} BeatmapData.count_normal
     * @param {string} BeatmapData.count_slider
     * @param {string} BeatmapData.count_spinner
     * @param {string} BeatmapData.submit_date
     * @param {string} BeatmapData.approved_date
     * @param {string} BeatmapData.last_update
     * @param {string} BeatmapData.artist
     * @param {string} BeatmapData.artist_unicode
     * @param {string} BeatmapData.title
     * @param {string} BeatmapData.title_unicode
     * @param {string} BeatmapData.creator
     * @param {string} BeatmapData.creator_id
     * @param {string} BeatmapData.bpm
     * @param {string} [BeatmapData.source=""]
     * @param {string} BeatmapData.tags
     * @param {string} BeatmapData.genre_id
     * @param {string} BeatmapData.language_id
     * @param {string} BeatmapData.favourite_count
     * @param {string} BeatmapData.rating
     * @param {string} BeatmapData.storyboard
     * @param {string} BeatmapData.video
     * @param {"0"|"1"} BeatmapData.download_unavailable
     * @param {"0"|"1"} BeatmapData.audio_unavailable
     * @param {string} BeatmapData.playcount
     * @param {string} BeatmapData.passcount
     * @param {string} BeatmapData.packs
     * @param {string} BeatmapData.max_combo
     * @param {string} BeatmapData.diff_aim
     * @param {string} BeatmapData.diff_speed
     * @param {string} BeatmapData.difficultyrating
     */
    constructor(BeatmapData) { 
        this.beatmapset_id = BeatmapData.beatmapset_id
        this.beatmap_id = BeatmapData.beatmap_id
        this.approved = BeatmapData.approved
        this.total_length = BeatmapData.total_length
        this.hit_length = BeatmapData.hit_length
        this.version = BeatmapData.version
        this.file_md5 = BeatmapData.file_md5
        this.diff_size = BeatmapData.diff_size
        this.diff_overall = BeatmapData.diff_overall
        this.diff_approach = BeatmapData.diff_approach
        this.diff_drain = BeatmapData.diff_drain
        this.mode = BeatmapData.mode
        this.count_normal = BeatmapData.count_normal
        this.count_slider = BeatmapData.count_slider
        this.count_spinner = BeatmapData.count_spinner
        this.submit_date = BeatmapData.submit_date
        this.approved_date = BeatmapData.approved_date
        this.last_update = BeatmapData.last_update
        this.artist = BeatmapData.artist
        this.artist_unicode = BeatmapData.artist_unicode
        this.title = BeatmapData.title
        this.title_unicode = BeatmapData.title_unicode
        this.creator = BeatmapData.creator
        this.creator_id = BeatmapData.creator_id
        this.bpm = BeatmapData.bpm
        this.source = BeatmapData.source
        this.tags = BeatmapData.tags
        this.genre_id = BeatmapData.genre_id
        this.language_id = BeatmapData.language_id
        this.favourite_count = BeatmapData.favourite_count
        this.rating = BeatmapData.rating
        this.storyboard = BeatmapData.storyboard
        this.video = BeatmapData.video
        this.download_unavailable = BeatmapData.download_unavailable
        this.audio_unavailable = BeatmapData.audio_unavailable
        this.playcount = BeatmapData.playcount
        this.passcount = BeatmapData.passcount
        this.packs = BeatmapData.packs
        this.max_combo = BeatmapData.max_combo
        this.diff_aim = BeatmapData.diff_aim
        this.diff_speed = BeatmapData.diff_speed
        this.difficultyrating = BeatmapData.difficultyrating
    }
}

class Score {
    
    /**
     * @param {Object} ScoreData
     * @param {string} ScoreData.beatmap_id
     * @param {string} [ScoreData.score_id=null]
     * @param {string} ScoreData.score
     * @param {string} ScoreData.maxcombo
     * @param {string} ScoreData.count50
     * @param {string} ScoreData.count100
     * @param {string} ScoreData.count300
     * @param {string} ScoreData.countmiss
     * @param {string} ScoreData.countkatu
     * @param {string} ScoreData.countgeki
     * @param {"0"|"1"} ScoreData.perfect
     * @param {string} ScoreData.enabled_mods
     * @param {string} ScoreData.user_id
     * @param {string} ScoreData.date
     * @param {string} ScoreData.rank
     * @param {string} [ScoreData.pp=null]
     * @param {"0"|"1"} ScoreData.replay_available
     */
    constructor(ScoreData) {
        this.beatmap_id = ScoreData.beatmap_id
        this.score_id = ScoreData.score_id
        this.score = ScoreData.score
        this.maxcombo = ScoreData.maxcombo
        this.count50 = ScoreData.count50
        this.count100 = ScoreData.count100
        this.count300 = ScoreData.count300
        this.countmiss = ScoreData.countmiss
        this.countkatu = ScoreData.countkatu
        this.countgeki = ScoreData.countgeki
        this.perfect = ScoreData.perfect
        this.enabled_mods = ScoreData.enabled_mods
        this.user_id = ScoreData.user_id
        this.date = ScoreData.date
        this.rank = ScoreData.rank
        this.pp = ScoreData.pp
        this.replay_available = ScoreData.replay_available
    }
}

/**
 * @class User
 */
class User {
    /**
     * @param {string} String
     * @param {Date} Date
     * @param {Event[]} EventArray
     */
    constructor(String, Date, EventArray) {
        this.user_id = String;
        this.username = String;
        this.join_date = Date || String;
        this.count300 = String;
        this.count100 = String;
        this.count50 = String;
        this.playcount = String;
        this.ranked_score = String;
        this.total_score = String;
        this.pp_rank = String;
        this.level = String;
        this.pp_raw = String;
        this.accuracy = String;
        this.count_rank_ss = String;
        this.count_rank_ssh = String;
        this.count_rank_s = String;
        this.count_rank_sh = String;
        this.count_rank_a = String;
        this.country = String;
        this.total_seconds_played = String;
        this.pp_country_rank = String;
        this.events = EventArray;
    }
}

module.exports = {
    /**
     * @class OsuEntry
     */
    Entry: class OsuEntry {

        /**
         * @param {import("../../RinClient")} RinClient 
         */
        constructor(RinClient) {
            this.Rin = RinClient
            this.Score = Score
            this.Beatmap = Beatmap
            this.Event = Event
            this.Get = {
                /**
                 * @returns {Promise<User[]>} `Promise<User[]>`
                 */
                User: async (Username, Mode) => {

                    switch (Mode) {
                        case "std":
                            Mode = 0
                            break
                        case "taiko":
                            Mode = 1
                            break
                        case "ctb":
                            Mode = 2
                            break
                        case "mania":
                            Mode = 3
                            break
                        case "":
                            Mode = ""
                            break
                    }

                    const GetUser = await Axios.get(`${BaseURL}/get_user?k=${ApiKey}&u=${Username}&m=${Mode}`)

                    return GetUser.data

                },
                Scores: async (BeatmapID, Username, Mode) => {

                    switch (Mode) {
                        case "std":
                            Mode = 0
                            break
                        case "taiko":
                            Mode = 1
                            break
                        case "ctb":
                            Mode = 2
                            break
                        case "mania":
                            Mode = 3
                            break
                        case "":
                            Mode = ""
                            break
                    }

                    const GetScore = await Axios.get(BaseURL + "/get_scores", {
                        k: ApiKey,
                        u: Username ? Username : "",
                        Mode
                    })

                    return GetScore.data

                },

                /**
                 * @param {string|number} BeatmapID 
                 * @returns {Promise<Beatmap[]>}
                 */
                Beatmap: async (BeatmapID) => {
                    const GetBeatmap = await Axios.get(`${BaseURL}/get_beatmaps?k=${ApiKey}&b=${BeatmapID}`)
                    return GetBeatmap.data.map(x => new Beatmap(x))
                },

                /**
                 * @param {string} Username 
                 * @param {string} Mode
                 * @returns {Promise<Score[]>} 
                 */
                Recent: async (Username, Mode) => {
                    switch (Mode) {
                        case "std":
                            Mode = 0
                            break
                        case "taiko":
                            Mode = 1
                            break
                        case "ctb":
                            Mode = 2
                            break
                        case "mania":
                            Mode = 3
                            break
                        case "":
                            Mode = ""
                            break
                    }

                    const GetRecent = await Axios.get(`${BaseURL}/get_user_recent?k=${ApiKey}&u=${Username}&m=${Mode}`)
                    return GetRecent.data.map(x => new Score(x))
                },

                /**
                 * @param {string} Username 
                 * @param {string} Mode
                 * @returns {Promise<Score[]>} 
                 */
                UserBest: async (Username, Mode) => {
                    switch (Mode) {
                        case "std":
                            Mode = 0
                            break
                        case "taiko":
                            Mode = 1
                            break
                        case "ctb":
                            Mode = 2
                            break
                        case "mania":
                            Mode = 3
                            break
                        case "":
                            Mode = ""
                            break
                    }

                    const GetUserBest = await Axios.get(`${BaseURL}/get_user_best?k=${ApiKey}&u=${Username}&m=${Mode}`)
                    return GetUserBest.data.map(x => new Score(x))
                }
            }
        }

        /**
         * @param {Score} ScoreData 
         * @param {"0"|"1"|"2"|"3"} Mode
         */
        async CreateScoreImage(ScoreData, Mode) {
            const BeatmapGet = (await this.Get.Beatmap(ScoreData.beatmap_id))[0]

            const Img = await require("canvas").loadImage(`https://assets.ppy.sh/beatmaps/${BeatmapGet.beatmapset_id}/covers/cover.jpg`)
            const Canv = require("canvas").createCanvas(Img.width, Img.height)
            const Contxt = Canv.getContext("2d")
            Contxt.drawImage(Img, 0, 0)
            Contxt.fillStyle = "rgba(0, 0, 0, 0.4)";
            Contxt.fillRect(0, 0, Img.width, Img.height);
            Contxt.fillStyle = "rgba(0, 0, 0, 0.6)";
            Contxt.fillRect(0, 0, Img.width, Img.height / 5)
            Contxt.font = '20px "Noto Sans CJK JP Regular"'
            Contxt.fillStyle = "#ffffff";
            Contxt.fillText(this.ResolveSongName(BeatmapGet), Img.width / 45, Img.height / 10)
            Contxt.font = '10px "Noto Sans CJK JP Regular"'
            Contxt.fillText(`Stars: ${parseFloat(BeatmapGet.difficultyrating).toFixed(2)}  AR: ${BeatmapGet.diff_approach}  OD: ${BeatmapGet.diff_overall}  HD: ${BeatmapGet.diff_drain}  CS: ${BeatmapGet.diff_size}`, Img.width / 45, Img.height / 6)
            Contxt.fillStyle = "rgba(0, 0, 0, 0.6)"
            Contxt.fillRect(23, 62, 400, 175)

            if(Mode == "0") {
                const threeHundredImage = await require("canvas").loadImage("src/assets/osu/hit300@2x.png")
                const oneHundredImage = await require("canvas").loadImage("src/assets/osu/hit100@2x.png")
                const fiftyImage = await require("canvas").loadImage("src/assets/osu/hit50@2x.png")
                const missImage = await require("canvas").loadImage("src/assets/osu/hit0@2x.png")
                const threeHundredImageRatio = this.Rin.Util.calcRatio(Img.width, Img.height)
                const oneHundredImageRatio = this.Rin.Util.calcRatio(Img.width, Img.height)
                const fiftyImageRatio = this.Rin.Util.calcRatio(Img.width, Img.height)
                const missImageRatio = this.Rin.Util.calcRatio(Img.width, Img.height)
                Contxt.drawImage(threeHundredImage, 37, 69, parseInt(threeHundredImageRatio.split(":")[0]) * 5, parseInt(threeHundredImageRatio.split(":")[1]) * 10)
                Contxt.font = '37px "Noto Sans CJK JP Regular"'
                Contxt.fillStyle = "#ffffff"
                Contxt.fillText(ScoreData["count300"], Img.width / 6.5, Img.height / 2.35)
                Contxt.drawImage(oneHundredImage, 225, 69, parseInt(oneHundredImageRatio.split(":")[0]) * 5, parseInt(oneHundredImageRatio.split(":")[1]) * 10)
                Contxt.font = '37px "Noto Sans CJK JP Regular"'
                Contxt.fillStyle = "#ffffff"
                Contxt.fillText(ScoreData["count100"], Img.width / 2.75, Img.height / 2.35)
                Contxt.drawImage(fiftyImage, 37, 150, parseInt(fiftyImageRatio.split(":")[0]) * 3.3, parseInt(fiftyImageRatio.split(":")[1]) * 10)
                Contxt.font = '37px "Noto Sans CJK JP Regular"'
                Contxt.fillStyle = "#ffffff"
                Contxt.fillText(ScoreData["count50"], Img.width / 6.5, Img.height / 1.325)
                Contxt.drawImage(missImage, 225, 150, parseInt(missImageRatio.split(":")[0]) * 2.75, parseInt(missImageRatio.split(":")[1]) * 10)
                Contxt.font = '37px "Noto Sans CJK JP Regular"'
                Contxt.fillStyle = "#ffffff"
                Contxt.fillText(ScoreData["countmiss"], Img.width / 2.75, Img.height / 1.325)
            } else if(Mode == "1") {
                const greatImage = await require("canvas").loadImage("src/assets/osu/taiko-hit300@2x.png")
                const goodImage = await require("canvas").loadImage("src/assets/osu/taiko-hit100@2x.png")
                const badImage = await require("canvas").loadImage("src/assets/osu/taiko-hit0@2x.png")
                const greatImageRatio = this.Rin.Util.calcRatio(Img.width, Img.height)
                const goodImageRatio = this.Rin.Util.calcRatio(Img.width, Img.height)
                const badImageRatio = this.Rin.Util.calcRatio(Img.width, Img.height)
                Contxt.drawImage(greatImage, 37, 69, parseInt(greatImageRatio.split(":")[0]) * 2.75, parseInt(greatImageRatio.split(":")[1]) * 10)
                Contxt.font = '37px "Noto Sans CJK JP Regular"'
                Contxt.fillStyle = "#ffffff"
                Contxt.fillText(ScoreData["countgeki"], Img.width / 6.5, Img.height / 2.35)
                Contxt.drawImage(goodImage, 225, 69, parseInt(goodImageRatio.split(":")[0]) * 2.75, parseInt(goodImageRatio.split(":")[1]) * 10)
                Contxt.font = '37px "Noto Sans CJK JP Regular"'
                Contxt.fillStyle = "#ffffff"
                Contxt.fillText(ScoreData["count300"], Img.width / 2.75, Img.height / 2.35)
                Contxt.drawImage(badImage, 37, 150, parseInt(badImageRatio.split(":")[0]) * 2.75, parseInt(badImageRatio.split(":")[1]) * 10)
                Contxt.font = '37px "Noto Sans CJK JP Regular"'
                Contxt.fillStyle = "#ffffff"
                Contxt.fillText(ScoreData["countmiss"], Img.width / 6.5, Img.height / 1.325)
            } else throw Error("Where's the mode?")

            return Canv.toBuffer()
        }

        SoftModes = {
            std: "std",
            standard: "std",
            "osu!standard": "std",
            "osu!std": "std",
            circles: "std",
            ctb: "ctb",
            catchthebeat: "ctb",
            "osu!catchthebeat": "ctb",
            "osu!ctb": "ctb",
            fruits: "ctb",
            taiko: "taiko",
            "osu!taiko": "taiko",
            drum: "taiko",
            mania: "mania",
            "osu!mania": "mania",
            piano: "mania"
        }

        Modes = {
            std: "Standard",
            ctb: "Catch The Beat",
            taiko: "Taiko",
            mania: "Mania"
        }

        /**
         * @param {Beatmap} BeatmapData 
         */
        ResolveSongName(BeatmapData) {
            if(!BeatmapData.source || BeatmapData.source == "") {
                return `${BeatmapData.artist} - ${BeatmapData.title}`
            } else {
                return `${BeatmapData.source} (${BeatmapData.artist}) - ${BeatmapData.title}`
            }
        }

        /**
         * @param {number} num
         */
        ResolveMod(num) {
            let uwu = num
            let modList = []

            if(uwu & 1 << 0) modList.push("NoFail");
            if(uwu & 1 << 1) modList.push("Easy");
            if(uwu & 1 << 2) modList.push("TouchDevice");
            if(uwu & 1 << 3) modList.push("Hidden");
            if(uwu & 1 << 4) modList.push("HardRock");
            if(uwu & 1 << 5) modList.push("SuddenDeath");

            if(uwu & 1 << 9) modList.push("Nightcore")
            else if (uwu & 1 << 6) modList.push("DoubleTime")

            if(uwu & 1 << 7) modList.push("Relax")
            if(uwu & 1 << 8) modList.push("HalfTime")
            if(uwu & 1 << 10) modList.push("Flashlight")
            if(uwu & 1 << 11) modList.push("Autoplay")
            if(uwu & 1 << 12) modList.push("Spunout")
            if(uwu & 1 << 13) modList.push("Autopilot")
            if(uwu & 1 << 14) modList.push("Perfect")
            if(uwu & 1 << 15) modList.push("4K")
            if(uwu & 1 << 16) modList.push("5K")
            if(uwu & 1 << 17) modList.push("6K")
            if(uwu & 1 << 18) modList.push("7K")
            if(uwu & 1 << 19) modList.push("8K")
            if(uwu & 1 << 20) modList.push("FadeIn")
            if(uwu & 1 << 21) modList.push("Random")
            if(uwu & 1 << 22) modList.push("Cinema")
            if(uwu & 1 << 23) modList.push("Target")
            if(uwu & 1 << 24) modList.push("9K")
            if(uwu & 1 << 25) modList.push("KeyCoop")
            if(uwu & 1 << 26) modList.push("1K")
            if(uwu & 1 << 27) modList.push("3K")
            if(uwu & 1 << 28) modList.push("2K")
            if(uwu & 1 << 30) modList.push("Mirror")

            return modList
        }

        /**
         * @param {Event[]} Events
         */
        ParseEvents(Events) {
            return Events.map(x => new (require("turndown"))().turndown(x.display_html).replace(/\/u\//g, "https://osu.ppy.sh/u/").replace(/\/b\//g, "https://osu.ppy.sh/b/").replace(/!\[\]\(\/images\/XH_small.png\)/g, "").replace(/!\[\]\(\/images\/X_small.png\)/g, "").replace(/!\[\]\(\/images\/SH_small.png\)/g, "").replace(/!\[\]\(\/images\/S_small.png\)/g, "").replace(/!\[\]\(\/images\/A_small.png\)/g, "").replace(/!\[\]\(\/images\/B_small.png\)/g, "").replace(/!\[\]\(\/images\/C_small.png\)/g, "").replace(/!\[\]\(\/images\/D_small.png\)/g, "").replace(/!\[\]\(\/images\/F_small.png\)/g, ""))
        }

        /**
         * @param {"0"|"1"|"2"|"3"} Num 
         * @param {Score} ScoreData
         */
        ParseAccCalculator(Num, ScoreData) {
            if(Num == "0") {
                return this.Rin.Util.osuStdCountAccuracy(parseInt(ScoreData.count300), parseInt(ScoreData.count100), parseInt(ScoreData.count50), parseInt(ScoreData.countmiss))
            } else if(Num == "1") {
                return this.Rin.Util.osuTaikoCountAccuracy(parseInt(ScoreData.count300), parseInt(ScoreData.count100), parseInt(ScoreData.countmiss))
            } else if(Num == "2") {
                return this.Rin.Util.osuCatchCountAccuracy(parseInt(ScoreData.count300), parseInt(ScoreData.count100), parseInt(ScoreData.count50), parseInt(ScoreData.countmiss), parseInt(ScoreData.countkatu))
            } else if(Num == "3") {
                return this.Rin.Util.osuManiaCountAccuracy(parseInt(ScoreData.countgeki), parseInt(ScoreData.count300), parseInt(ScoreData.countkatu), parseInt(ScoreData.count100), parseInt(ScoreData.count50), parseInt(ScoreData.countmiss))
            }
        }

        /**
         * @param {Score} ScoreData 
         */
        async CalculatePP(ScoreData) {
            const BeatmapGet = (await this.Get.Beatmap(ScoreData.beatmap_id))[0]
            const MapGet = await this.Rin.Util.REST(`https://osu.ppy.sh/osu/${BeatmapGet.beatmap_id}`, "GET")
            const ParsedMap = new (require("ojsama").parser)().feed(MapGet).map
            const ParsedStars = new (require("ojsama").diff)().calc({map: ParsedMap, mods: parseInt(ScoreData.enabled_mods)})
            return require("ojsama").ppv2({map: ParsedMap, stars: ParsedStars, combo: parseInt(ScoreData.maxcombo), mode: parseInt(BeatmapGet.mode), acc_percent: this.ParseAccCalculator(BeatmapGet.mode, ScoreData) * 100}).total
        }
    }
}