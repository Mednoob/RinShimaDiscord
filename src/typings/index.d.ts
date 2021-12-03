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

export interface RawBeatmap {
    approved: "-2"|"-1"|"0"|"1"|"2"|"3"|"4";
    submit_date: string;
    approved_date: string;
    last_update: string;
    artist: string;
    beatmap_id: string;
    beatmapset_id: string;
    bpm: string;
    creator: string;
    creator_id: string;
    difficultyrating: string;
    diff_aim: string;
    diff_speed: string;
    diff_size: string;
    diff_overall: string;
    diff_approach: string;
    diff_drain: string;
    hit_length: string;
    source: string;
    genre_id: string;
    language_id: string;
    title: string;
    total_length: string;
    version: string;
    file_md5: string;
    mode: "0"|"1"|"2"|"3";
    tags: string;
    favourite_count: string;
    rating: string;
    playcount: string;
    passcount: string;
    count_normal: string;
    count_slider: string;
    count_spinner: string;
    max_combo: string;
    storyboard: "0"|"1";
    video: "0"|"1";
    download_unavailable: "0"|"1";
    audio_unavailable: "0"|"1";
}
