const RegistryBaseURL = "https://registry.npmjs.org"
const APIBaseURL = "https://api.npmjs.org"

class PackageDownloadCountsData {

    /**
     * @param {Object} DownloadCountsData
     * @param {string} DownloadCountsData.downloads
     * @param {string} DownloadCountsData.start
     * @param {string} DownloadCountsData.end
     * @param {string} DownloadCountsData.package
     */
    constructor(DownloadCountsData) {
        this.downloads = DownloadCountsData.downloads
        this.start = DownloadCountsData.start
        this.end = DownloadCountsData.end
        this.package = DownloadCountsData.package
    }
}

class RegistrySearchPackage {

    /**
     * @param {Object} Data
     * @param {Object} Data.package
     * @param {string} Data.package.name
     * @param {string} Data.package.scope
     * @param {string} Data.package.version
     * @param {string} Data.package.description
     * @param {string[]} Data.package.keywords
     * @param {string} Data.package.date
     * @param {Object} Data.package.links
     * @param {string} Data.package.links.npm
     * @param {string} Data.package.links.homepage
     * @param {string} Data.package.links.repository
     * @param {string} Data.package.links.bugs
     * @param {Object} Data.package.author
     * @param {string} Data.package.author.name
     * @param {string} Data.package.author.email
     * @param {string} Data.package.author.username
     * @param {Object} Data.package.publisher
     * @param {string} Data.package.publisher.username
     * @param {string} Data.package.publisher.email
     * @param {Object[]} Data.package.maintainers
     * @param {string} Data.package.maintainers.username
     * @param {string} Data.package.maintainers.email
     * @param {Object} Data.score
     * @param {number} Data.score.final
     * @param {Object} Data.score.detail
     * @param {number} Data.score.detail.quality
     * @param {number} Data.score.detail.popularity
     * @param {number} Data.score.detail.maintenance
     * @param {number} Data.searchScore
     */
    constructor(Data) {
        this.package = Data.package
        this.score = Data.score
        this.searchScore = Data.searchScore
    }
}

class Npm {

    /**
     * @param {import("../../RinClient")} RinClient
     */
    constructor(RinClient) {
        this.Rin = RinClient
    }

    /**
     * Search Package from NPM Registry API
     * @param {string} Query Query to be searched
     * @returns {Promise<RegistrySearchPackage[]>} `Promise<RegistrySearchPackage[]>`
     */
    async SearchPackage(Query) {
        return this.Rin.Util.REST(`${RegistryBaseURL}/-/v1/search?text=${Query}`).then(x => x.objects.map(y => new RegistrySearchPackage(y)))
    }

    /**
     * Get Package download counts
     * @param {string} Query Query to be searched
     * @param {"last-day"|"last-week"|"last-month"} TimeParam Time Parameter
     * @returns {Promise<PackageDownloadCountsData>} `Promise<PackageDownloadCountsData>`
     */
    async PackagePointDownloadCounts(Query, TimeParam) {
        return this.Rin.Util.REST(`${APIBaseURL}/downloads/point/${TimeParam}/${Query}`).then(x => new PackageDownloadCountsData(x))
    }

    /**
     * @param {RegistrySearchPackage} Pack 
     */
    ParseName(Pack) {
        if(!Pack.package.author) return "Unknown";
        else if (!Pack.package.author.username) return `${Pack.package.author.name}`
        else return `${Pack.package.author.username}(${Pack.package.author.name})`
    }
}

module.exports = {
    Entry: Npm
}