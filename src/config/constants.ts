import { ColorResolvable, ShardingManagerMode, UserResolvable } from "discord.js";

export const devs: UserResolvable[] = ["956162927726063626", "366169273485361153", "243728573624614912"];
export const devGuild: string[] = ["972407605295198258"];

export const shardingMode: ShardingManagerMode = "worker";
export const embedColor = "22C9FF" as ColorResolvable;
export const shardsCount: number | "auto" = "auto";
export const defaultPrefix = "r-";
