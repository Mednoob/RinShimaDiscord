/* eslint-disable @typescript-eslint/naming-convention */
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
    regex?: string;
    path?: string;
}

export interface TextCommandQuery extends BaseCommandQuery {
    categoryKey?: string;
    description?: string;
    aliases?: string[];
    slash?: boolean;
    nsfw?: boolean;
    usage?: string;
    dev?: boolean;
    query: string;
    type: "text";
}

export type CommandQuery = TextCommandQuery;
export type OsuRank =
    | "A"
    | "B"
    | "C"
    | "D"
    | "F"
    | "S"
    | "SH"
    | "X"
    | "XH";

interface BaseOsuData {
    countgeki: string;
    countkatu: string;
    countmiss: string;
    count300: string;
    count100: string;
    count50: string;
    user_id: string;
}

interface BaseGameplay extends BaseOsuData {
    replay_available: "0" | "1";
    enabled_mods: string;
    beatmap_id: string;
    maxcombo: string;
    perfect: "0" | "1";
    score_id: string;
    rank: OsuRank;
    score: string;
    date: string;
    pp: string;
}

export interface RawOsuScore extends BaseGameplay {
    beatmap_id: never;
    username: string;
}

export interface RawUserRecent extends BaseGameplay {
    replay_available: never;
    score_id: never;
    pp: never;
}

export type RawUserBest = BaseGameplay;

export interface RawBeatmap {
    approved: "-1" | "-2" | "0" | "1" | "2" | "3" | "4";
    download_unavailable: "0" | "1";
    audio_unavailable: "0" | "1";
    difficultyrating: string;
    favourite_count: string;
    approved_date: string;
    beatmapset_id: string;
    diff_approach: string;
    count_spinner: string;
    mode: "0" | "1" | "2" | "3";
    count_normal: string;
    count_slider: string;
    diff_overall: string;
    total_length: string;
    language_id: string;
    last_update: string;
    storyboard: "0" | "1";
    submit_date: string;
    beatmap_id: string;
    creator_id: string;
    diff_drain: string;
    diff_speed: string;
    hit_length: string;
    diff_size: string;
    max_combo: string;
    passcount: string;
    playcount: string;
    diff_aim: string;
    file_md5: string;
    genre_id: string;
    creator: string;
    version: string;
    artist: string;
    rating: string;
    source: string;
    video: "0" | "1";
    title: string;
    tags: string;
    bpm: string;
}

export type MethodDecorator<Target, Result> = (target: Target, propertyKey: string, descriptor: PropertyDescriptor) => Result;
