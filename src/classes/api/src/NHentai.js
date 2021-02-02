const BaseURL = "https://nhentai.net/api"
const ImgBaseURL = "https://i.nhentai.net"
const ThumbBaseURL = "https://t.nhentai.net"

/**
 * @class NHentai Class
 */
class NHentai {

    /**
     * @constructor 
     * @param {import("../../RinClient")} RinClient
     */
    constructor(RinClient) {
        this.Rin = RinClient
    }

    /**
     * Search Doujin from nHentai API
     * @param {string} Query Query to be searched
     * @param {boolean} [EnglishOnly = false] Whether the search result should be filtered to be english only or not. The default is false
     * @returns {Promise<Object>} `Promise<Object>`
     */
    async Search(Query, EnglishOnly = false) {
        return this.Rin.Util.REST(`${BaseURL}/galleries/search?query=${Query}`).then(x => EnglishOnly == true ? x.result.filter(y => y.tags.filter(z => z.name).length >= 1) : x.result)
    }

    /**
     * Get Doujin Information
     * @param {string | number} DoujinID The Doujin ID of the Doujin that will be retrieved its information
     * @returns {Promise<Object>} `Promise<Object>`
     */
    async GetBook(DoujinID) {
        return this.Rin.Util.REST(`${BaseURL}/gallery/${DoujinID}`)
    }

    /**
     * Get Doujin Pages URL
     * @param {string | number} MediaID The Doujin Media ID
     * @param {Object[]} PageArray The Doujin Page Array
     * @returns {string[]} `string[]`
     */
    GetPagesURL(MediaID, PageArray) {
        return PageArray.map((x, n) => `${ImgBaseURL}/galleries/${MediaID}/${n + 1}.${CheckExtensionType(x.t)}`)
    }

    /**
     * Get Doujin Cover URL
     * @param {string | number} MediaID The Doujin Media ID
     * @param {Object} CoverObject The Doujin Cover Object
     * @returns {string} `string`
     */
    GetCoverURL(MediaID, CoverObject) {
        return `${ThumbBaseURL}/galleries/${MediaID}/cover.${CheckExtensionType(CoverObject.t)}`
    }
}

/**
 * Check NHentai File Extension from NHentai Image Object
 * @param {string} Extension 
 * @returns {string} `string`
 */
function CheckExtensionType(Extension) {
    let Result = '';
    switch(Extension) {
        case 'j':
            Result = 'jpg'
            break;
        case 'p':
            Result = 'png'
            break;
        case 'g':
            Result = 'gif'
            break;
    }
    return Result;
}

module.exports = {
    Entry: NHentai
}