const Axios = require("axios")
const ImgBaseURL = "https://api.lolis.life"

/**
 * @class Loli
 */
class Loli {
    /**
     * @param {string} Url
     * @param {string[]} Category
     */
    constructor(Url, Category) {
        this.url = Url;
        this.categories = Category;
    }
}

module.exports = {
    /**
     * @class LoliEntry
     */
    Entry: class LoliEntry {
        constructor() {}

        Get = {
            /**
             * @returns {Promise<Loli>} `Promise<Loli>`
             */
            Neko: async () => {
                const GetNeko = await Axios.get(ImgBaseURL + "/neko")

                return {
                    url: GetNeko.data.url,
                    categories: GetNeko.data.categories
                }
            },
             /**
             * @returns {Promise<Loli>} `Promise<Loli>`
             */
            Futa: async () => {
                const GetFuta = await Axios.get(ImgBaseURL + "/futa")

                return {
                    url: GetFuta.data.url,
                    categories: GetFuta.data.categories
                }
            },
             /**
             * @returns {Promise<Loli>} `Promise<Loli>`
             */
            Kawaii: async () => {
                const GetKawaii = await Axios.get(ImgBaseURL + "/kawaii")

                return {
                    url: GetKawaii.data.url,
                    categories: GetKawaii.data.categories
                }
            },
             /**
             * @returns {Promise<Loli>} `Promise<Loli>`
             */
            Lewd: async () => {
                const GetLewd = await Axios.get(ImgBaseURL + "/lewd")

                return {
                    url: GetLewd.data.url,
                    categories: GetLewd.data.categories
                }
            },
             /**
             * @returns {Promise<Loli>} `Promise<Loli>`
             */
            Slave: async () => {
                const GetSlave = await Axios.get(ImgBaseURL + "/slave")

                return {
                    url: GetSlave.data.url,
                    categories: GetSlave.data.url
                }
            },
             /**
             * @returns {Promise<Loli>} `Promise<Loli>`
             */
            Pat: async () => {
                const GetPat = await Axios.get(ImgBaseURL + "/pat")

                return {
                    url: GetPat.data.url,
                    categories: GetPat.data.categories
                }
            },
             /**
             * @returns {Promise<Loli>} `Promise<Loli>`
             */
            Monster: async () => {
                const GetMonster = await Axios.get(ImgBaseURL + "/monster")

                return {
                    url: GetMonster.data.url,
                    categories: GetMonster.data.categories
                }
            },
             /**
             * @returns {Promise<Loli>} `Promise<Loli>`
             */
            Random: async (nsfw = false) => {
                if(nsfw == true) {
                    const GetNsfwRandom = await Axios.get(ImgBaseURL + "/random?nsfw=true")

                    return {
                        url: GetNsfwRandom.data.url,
                        categories: GetNsfwRandom.data.categories
                    }
                } else {
                    const GetRandom = await Axios.get(ImgBaseURL + "/random")

                    return {
                        url: GetRandom.data.url,
                        categories: GetRandom.data.categories
                    }
                }
            }
        }
    }
}