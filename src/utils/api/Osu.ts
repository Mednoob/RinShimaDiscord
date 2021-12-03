import { BaseGameplay as BG, OsuRank as OR, RawBeatmap, RawUserBest, RawUserRecent } from "../../typings";
import { ClientUtils } from "../ClientUtils";

type OsuApproveStatus = "Graveyard"|"WIP"|"Pending"|"Ranked"|"Approved"|"Qualified"|"Loved";
type OsuRank = "Silver SS"|"SS"|"Silver S"|"S"|"A"|"B"|"C"|"D"|"F";
type OsuMode = "std"|"taiko"|"fruits"|"mania";

const approveStatus: Record<RawBeatmap["approved"], OsuApproveStatus> = {
    "-1": "WIP",
    "-2": "Graveyard",
    0: "Pending",
    1: "Ranked",
    2: "Approved",
    3: "Qualified",
    4: "Loved"
};

const modes: Record<RawBeatmap["mode"], OsuMode> = {
    0: "std",
    1: "taiko",
    2: "fruits",
    3: "mania"
};

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

export class Beatmap {
    public readonly beatmapId: string;
    public readonly beatmapSetId: string;
    public readonly bpm: number;
    public readonly creator: string;
    public readonly creatorId: string;
    public readonly difficulty: { drain: number; overall: number; size: number; aim: number; speed: number; approach: number };
    public readonly difficultyName: string;
    public readonly difficultyRating: number;
    public readonly hitLength: number;
    public readonly maxCombo: number;
    public readonly submitDate: Date;
    public readonly approvedDate: Date;
    public readonly lastUpdate: Date;
    public readonly artist: string;
    public readonly source: string;
    public readonly genreId: string;
    public readonly languageId: string;
    public readonly title: string;
    public readonly totalLength: number;
    public readonly hash: string;
    public readonly tags: string[];
    public readonly favouriteCount: number;
    public readonly rating: number;
    public readonly playCount: number;
    public readonly passCount: number;
    public readonly count: { normal: number; slider: number; spinner: number };
    public readonly storyboard: boolean;
    public readonly video: boolean;
    public readonly downloadUnavailable: boolean;
    public readonly audioUnavailable: boolean;

    public constructor(public readonly raw: RawBeatmap) {
        this.beatmapId = raw.beatmap_id;
        this.beatmapSetId = raw.beatmapset_id;
        this.bpm = parseFloat(raw.bpm);
        this.creator = raw.creator;
        this.creatorId = raw.creator_id;
        this.difficulty = {
            aim: parseFloat(raw.diff_aim),
            approach: parseFloat(raw.diff_approach),
            drain: parseFloat(raw.diff_drain),
            overall: parseFloat(raw.diff_overall),
            size: parseFloat(raw.diff_size),
            speed: parseFloat(raw.diff_speed)
        };
        this.difficultyName = raw.version;
        this.difficultyRating = parseFloat(raw.difficultyrating);
        this.hitLength = parseInt(raw.hit_length);
        this.maxCombo = parseInt(raw.max_combo);
        this.submitDate = new Date(raw.submit_date);
        this.approvedDate = new Date(raw.approved_date);
        this.lastUpdate = new Date(raw.last_update);
        this.artist = raw.artist;
        this.source = raw.source;
        this.genreId = raw.genre_id;
        this.languageId = raw.language_id;
        this.title = raw.title;
        this.totalLength = parseInt(raw.total_length);
        this.hash = raw.file_md5;
        this.tags = raw.tags.split(" ");
        this.favouriteCount = parseInt(raw.favourite_count);
        this.rating = parseFloat(raw.rating);
        this.playCount = parseInt(raw.playcount);
        this.passCount = parseInt(raw.passcount);
        this.count = {
            normal: parseInt(raw.count_normal),
            slider: parseInt(raw.count_slider),
            spinner: parseInt(raw.count_spinner)
        };
        this.maxCombo = parseInt(raw.max_combo);
        this.storyboard = raw.storyboard === "1";
        this.video = raw.video === "1";
        this.downloadUnavailable = raw.download_unavailable === "1";
        this.audioUnavailable = raw.audio_unavailable === "1";
    }

    public get approveStatus(): OsuApproveStatus {
        return approveStatus[this.raw.approved];
    }

    public get mode(): OsuMode {
        return modes[this.raw.mode];
    }
}

export async function fetchUserRecent(username: string, mode: OsuMode): Promise<UserRecent[]> {
    const raw = await ClientUtils.REST.get(`https://osu.ppy.sh/api/get_user_recent?k=${process.env.OSU_API_KEY!}&u=${username}&m=${Object.keys(modes).find(key => modes[key as RawBeatmap["mode"]] === mode)!}`).json<RawUserRecent[]>();

    return raw.map(r => new UserRecent(r));
}

export async function fetchUserBest(username: string, mode: OsuMode): Promise<UserBest[]> {
    const raw = await ClientUtils.REST.get(`https://osu.ppy.sh/api/get_user_best?k=${process.env.OSU_API_KEY!}&u=${username}&m=${Object.keys(modes).find(key => modes[key as RawBeatmap["mode"]] === mode)!}`).json<RawUserBest[]>();

    return raw.map(r => new UserBest(r));
}
