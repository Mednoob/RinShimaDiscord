import "./typings";
import { ShardingManager } from "discord.js";

const shardManager = new ShardingManager("./src/bot.js", {
    token: process.env.DISCORD_TOKEN,
    mode: "process",
    totalShards: "auto"
});

void shardManager.spawn();
