class Post {

    /**
     * @param {Object} Html 
     * @param {string} Html.height
     * @param {string} Html.score
     * @param {string} Html.file_url
     * @param {string} Html.parent_id
     * @param {string} Html.sample_url
     * @param {string} Html.sample_width
     * @param {string} Html.sample_height
     * @param {string} Html.preview_url
     * @param {string} Html.rating
     * @param {string} Html.tags
     * @param {string} Html.id
     * @param {string} Html.width
     * @param {string} Html.change
     * @param {string} Html.md5
     * @param {string} Html.creator_id
     * @param {"true"|"false"} Html.has_children
     * @param {string} Html.created_at
     * @param {string} Html.status
     * @param {string} Html.source
     * @param {"true"|"false"} Html.has_notes
     * @param {"true"|"false"} Html.has_comments
     * @param {string} Html.preview_width
     * @param {string} Html.preview_height
     */
    constructor(Html) {
        this.height = parseInt(Html.height)
        this.width = parseInt(Html.width)
        this.score = parseInt(Html.score)
        this.file_url = Html.file_url
        this.parent_id = Html.parent_id
        this.sample_url = Html.sample_url
        this.sample_height = parseInt(Html.sample_height)
        this.sample_width = parseInt(Html.sample_width)
        this.preview_url = Html.preview_url
        this.preview_height = parseInt(Html.preview_height)
        this.preview_width = parseInt(Html.preview_width)
        this.rating = Html.rating
        this.tags = Html.tags.split(" ")
        this.id = Html.id
        this.change = Html.change
        this.md5 = Html.md5
        this.creator_id = Html.creator_id
        this.has_children = Html.has_children == "true"
        this.created_at = Html.created_at
        this.status = Html.status
        this.source = Html.source
        this.has_notes = Html.has_notes == "true"
        this.has_comments = Html.has_comments == "true"

    }
}

class Rule34 {

    /**
     * @param {import("../../RinClient")} Rin
     */
    constructor(Rin) {
        this.Rin = Rin
        this.Post = Post
    }

    /**
     * @param {string[]} Tags 
     */
    async Search(Tags) {
        const DataGet = await this.Rin.Util.REST(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${Tags.join("+")}`)
        return this.ParseXML(DataGet)
    }

    async RandomAll() {
        const DataGet = await this.Rin.Util.REST(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&pid=${Math.round(Math.random() * 100)}`)
        return this.ParseXML(DataGet)
    }

    /**
     * @param {string} Xml 
     * @returns {Post[]}
     */
    ParseXML(Xml) {
        const json = JSON.parse(require("xml-js").xml2json(Xml, {compact: false}))
        return json.elements[0].elements.map(x => new Post(x.attributes))
    }
}

module.exports = {
    Entry: Rule34
}