export interface Rule34Post {
    rating: "explicit" | "questionable" | "safe";
    sample_height: number;
    sample_width: number;
    preview_url: string;
    sample_url: string;
    directory: number;
    parent_id: number;
    file_url: string;
    change: number;
    height: number;
    sample: number;
    image: string;
    owner: string;
    score: number;
    width: number;
    hash: string;
    tags: string;
    id: number;
}

export interface CategoryData {
    nsfw?: boolean;
    dev?: boolean;
    path?: string;
    name: string;
    key: string;
}

export interface BaseCommandQuery {
    path?: string;
    regex?: string;
}

export interface TextCommandQuery extends BaseCommandQuery {
    query: string;
    aliases?: string[];
    type: "text";
    categoryKey?: string;
    description?: string;
    usage?: string;
    dev?: boolean;
    nsfw?: boolean;
    slash?: boolean;
}

export type CommandQuery = TextCommandQuery;
export type OsuRank = "XH" | "X" | "SH" | "S" | "A" | "B" | "C" | "D" | "F";

interface BaseOsuData {
    user_id: string;
    count300: string;
    count100: string;
    count50: string;
    countmiss: string;
    countgeki: string;
    countkatu: string;
}

interface BaseGameplay extends BaseOsuData {
    beatmap_id: string;
    score_id: string;
    maxcombo: string;
    rank: OsuRank;
    perfect: "0"|"1";
    enabled_mods: string;
    date: string;
    score: string;
    replay_available: "0"|"1";
    pp: string;
}

export interface RawOsuScore extends BaseGameplay {
    beatmap_id: never;
    username: string;
}

export interface RawUserRecent extends BaseGameplay {
    score_id: never;
    replay_available: never;
    pp: never;
}

export type RawUserBest = BaseGameplay;
