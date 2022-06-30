import { CommandManager } from "../utils/structures/CommandManager";
import { ModuleManager } from "../utils/structures/ModuleManager";
import { EventsLoader } from "../utils/structures/EventsLoader";
import { createLogger } from "../utils/functions/createLogger";
import { ClientUtils } from "../utils/structures/ClientUtils";
import * as config from "../config";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "discord.js";
import got from "got";

const path = dirname(fileURLToPath(import.meta.url));

export class Rin extends Client {
    public readonly config = config;
    public readonly request = got;
    public readonly utils = new ClientUtils(this);
    public readonly commands = new CommandManager(this);
    public readonly events = new EventsLoader(this);
    public readonly modules = new ModuleManager(this, resolve(path, "..", "modules"));
    public readonly logger = createLogger({
        name: "bot",
        shardId: this.shard!.ids[0],
        type: "shard",
        dev: this.config.isDev
    });

    public async build(token?: string): Promise<this> {
        await this.modules.load(token);
        return this;
    }
}
