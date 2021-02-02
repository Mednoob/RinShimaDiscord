const Axios = require("axios")
const ImgBaseURL = "https://nekos.life/api/v2/img"

/**
 * @class Neko
 */
class Neko extends String {
    constructor(){
        
    }
}

module.exports = {
    /**
     * @class NekoEntry
     */
    Entry: class NekoEntry {
        constructor() {}

        Get = {
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            Neko: async () => {
                const GetNeko = await Axios.get(ImgBaseURL + "/neko")
                
                return GetNeko.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            NsfwNeko: async () => {
                const GetNsfwNeko = await Axios.get(ImgBaseURL + "/lewd")

                return GetNsfwNeko.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            NekoGif: async () => {
                const GetNekoGif = await Axios.get(ImgBaseURL + "/ngif")

                return GetNekoGif.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            NsfwNekoGif: async () => {
                const GetNsfwNekoGif = await Axios.get(ImgBaseURL + "/nsfw_neko_gif")

                return GetNsfwNekoGif.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            Hug: async () => {
                const GetHug = await Axios.get(ImgBaseURL + "/hug")

                return GetHug.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            Waifu: async () => {
                const GetWaifu = await Axios.get(ImgBaseURL + "/waifu")

                return GetWaifu.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            Kiss: async () => {
                const GetKiss = await Axios.get(ImgBaseURL + "/kiss")

                return GetKiss.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            Avatar: async () => {
                const GetAvatar = await Axios.get(ImgBaseURL + "/avatar")

                return GetAvatar.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            NsfwAvatar: async () => {
                const GetNsfwAvatar = await Axios.get(ImgBaseURL + "/nsfw_avatar")

                return GetNsfwAvatar.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            Futanari: async () => {
                const GetFutanari = await Axios.get(ImgBaseURL + "/futanari")

                return GetFutanari.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            Yuri: async () => {
                const GetYuri = await Axios.get(ImgBaseURL + "/yuri")

                return GetYuri.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            EroYuri: async () => {
                const GetEroYuri = await Axios.get(ImgBaseURL + "/eroyuri")

                return GetEroYuri.data.url
            },
            /**
             * @returns {Promise<Neko>} `Promise<Neko>`
             */
            Pussy: async () => {
                const GetPussy = await Axios.get(ImgBaseURL + "/pussy")

                return GetPussy.data.url
            }
        }
    }
}