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
