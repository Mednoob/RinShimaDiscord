class Japanese {
    constructor() {}

    hiragana = {
        wa: "わ",
        wi: "ゐ",
        we: "ゑ",
        wo: "を",
        ra: "ら",
        ri: "り",
        ru: "る",
        re: "れ",
        ro: "ろ",
        ya: "や",
        yu: "ゆ",
        yo: "よ",
        ma: "ま",
        mi: "み",
        mu: "む",
        me: "め",
        mo: "も",
        ha: "は",
        hi: "ひ",
        hu: "ふ",
        fu: "ふ",
        he: "へ",
        ho: "ほ",
        na: "な",
        ni: "に",
        nu: "ぬ",
        ne: "ね",
        no: "の",
        ta: "た",
        ti: "ち",
        chi: "ち",
        tu: "つ",
        tsu: "つ",
        te: "て",
        to: "と",
        sa: "さ",
        si: "し",
        shi: "し",
        su: "す",
        se: "せ",
        so: "そ",
        ka: "か",
        ki: "き",
        ku: "く",
        ke: "け",
        ko: "こ",
        a: "あ",
        i: "い",
        u: "う",
        e: "え",
        o: "お",
        n: "ん"
    }

    katakana = {
        wa: "ワ",
        wi: "ヰ",
        we: "ヱ",
        wo: "ヲ",
        ra: "ラ",
        ri: "リ",
        ru: "ル",
        re: "レ",
        ro: "ロ",
        ya: "ヤ",
        yu: "ユ",
        yo: "ヨ",
        ma: "マ",
        mi: "ミ",
        mu: "ム",
        me: "メ",
        mo: "モ",
        ha: "ハ",
        hi: "ヒ",
        hu: "フ",
        fu: "フ",
        he: "ヘ",
        ho: "ホ",
        na: "ナ",
        ni: "ニ",
        nu: "ヌ",
        ne: "ネ",
        no: "ノ",
        ta: "タ",
        ti: "チ",
        chi: "チ",
        tu: "ツ",
        tsu: "ツ",
        te: "テ",
        to: "ト",
        sa: "サ",
        si: "シ",
        shi: "シ",
        su: "ス",
        se: "セ",
        so: "ソ",
        ka: "カ",
        ki: "キ",
        ku: "ク",
        ke: "ケ",
        ko: "コ",
        a: "ア",
        i: "イ",
        u: "ウ",
        e: "エ",
        o: "オ",
        n: "ン"
    }

    /**
     * @param {string} letter
     */
    generateImage(letter) {
        const   canv = require("canvas").createCanvas(2048, 2048),
                contxt = canv.getContext("2d");
        contxt.fillStyle = "#FFC0CB"
        contxt.fillRect(0, 0, canv.width, canv.height)
        contxt.font = '2000px "Noto Sans CJK JP Regular"'
        contxt.fillStyle = "#000000"
        contxt.fillText(letter, 50, 1800)

        return canv.toBuffer("image/png")
    }

    /**
     * @param {string[]} answers 
     */
    parseAnswers(answers) {
        if(answers.length > 1) {
            return `The answers are ${answers.map(x => `\`${x}\``).join(", ")}.`
        } else {
            return `The answer is ${answers.map(x => `\`${x}\``).join("")}.`
        }
    }
}

module.exports = Japanese