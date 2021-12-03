import { BaseGameplay as BG, OsuRank as OR, RawUserRecent, RawUserBest } from "../../typings";

type OsuRank = "Silver SS"|"SS"|"Silver S"|"S"|"A"|"B"|"C"|"D"|"F";
type OsuMode = "std"|"taiko"|"fruits"|"mania";

const ranks: Record<OR, OsuRank> = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    F: "F",
    S: "S",
    SH: "Silver S",
    X: "Silver S",
    XH: "Silver S"
};

export const modeBitwise: Record<string, number> = {
    Autoplay: 2048,
    Cinema: 4194304,
    DoubleTime: 64,
    Easy: 2,
    FadeIn: 1048576,
    Flashlight: 1024,
    HalfTime: 256,
    HardRock: 16,
    Hidden: 8,
    Key1: 67108864,
    Key2: 268435456,
    Key3: 134217728,
    Key4: 32768,
    Key5: 65536,
    Key6: 131072,
    Key7: 262144,
    Key8: 524288,
    Key9: 16777216,
    KeyCoop: 33554432,
    Mirror: 1073741824,
    Nightcore: 512,
    NoFail: 1,
    Perfect: 16384,
    Random: 2097152,
    Relax: 128,
    Relax2: 8192,
    ScoreV2: 536870912,
    SpunOut: 4096,
    SuddenDeath: 32,
    Target: 8388608,
    TouchDevice: 4
};

abstract class BaseGameplay {
    public readonly userId: string;
    public readonly beatmapId: string;
    public readonly count: { "300": number; "100": number; "50": number; miss: number; katu: number; geki: number };
    public readonly date: Date;
    public readonly enabledMods: number;
    public readonly maxCombo: number;
    public readonly perfect: boolean;
    public readonly score: number;
    public readonly rank: OsuRank;

    public constructor(public readonly raw: BG) {
        this.userId = raw.user_id;
        this.beatmapId = raw.beatmap_id;
        this.count = {
            50: parseInt(raw.count50),
            100: parseInt(raw.count100),
            300: parseInt(raw.count300),
            geki: parseInt(raw.countgeki),
            katu: parseInt(raw.countkatu),
            miss: parseInt(raw.countmiss)
        };
        this.date = new Date(raw.date);
        this.enabledMods = parseInt(raw.enabled_mods);
        this.maxCombo = parseInt(raw.maxcombo);
        this.perfect = raw.perfect === "1";
        this.score = parseInt(raw.score);
        this.rank = ranks[raw.rank];
    }

    public get mods(): string[] {
        const mods: string[] = [];
        for (const mod in modeBitwise) {
            if (modeBitwise[mod] & this.enabledMods) mods.push(mod);
        }
        return mods;
    }

    public getAccuracy(mode: OsuMode): number {
        if (mode === "mania") {
            return ((300 * (this.count["300"] + this.count.geki)) + (100 * this.count["100"]) + (50 * this.count["50"])) / (300 * (this.count.geki + this.count["300"] + this.count.katu + this.count["100"] + this.count["50"] + this.count.miss));
        } else if (mode === "fruits") {
            return (this.count["300"] + this.count["100"] + this.count["50"]) / (this.count["300"] + this.count["100"] + this.count["50"] + this.count.miss + this.count.katu);
        } else if (mode === "taiko") {
            return ((0.5 * this.count["300"]) + this.count["100"]) / (this.count["300"] + this.count["100"] + this.count.miss);
        }

        return ((300 * this.count["300"]) + (100 * this.count["100"]) + (50 * this.count["50"])) / (300 * (this.count["300"] + this.count["100"] + this.count["50"] + this.count.miss));
    }
}

export class UserRecent extends BaseGameplay {
    public constructor(raw: RawUserRecent) {
        super(raw);
    }
}

export class UserBest extends BaseGameplay {
    public readonly scoreId: string;
    public readonly pp: number;
    public readonly replayAvailable: boolean;

    public constructor(raw: RawUserBest) {
        super(raw);

        this.scoreId = raw.score_id;
        this.pp = parseInt(raw.pp);
        this.replayAvailable = raw.replay_available === "1";
    }
}
