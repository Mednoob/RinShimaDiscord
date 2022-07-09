import { Rin } from "../../structures/Rin";
import { Module } from "../../typings";
import { readdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { Collection } from "discord.js";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

export class ModuleManager {
    public readonly modules = new Collection<string, Module>();

    public constructor(public readonly client: Rin, private readonly path: string) {}

    public async load(token?: string): Promise<void> {
        const dirs = await readdir(resolve(this.path));
        this.client.logger.info(`Found ${dirs.length} modules`);

        for (const module of dirs) {
            const path = resolve(this.path, module);
            const metaPath = resolve(path, "module.meta.js");
            const meta: Module["meta"] = existsSync(metaPath)
                ? await import(pathToFileURL(metaPath).toString())
                    .then((x: { default: Module["meta"] }) => x.default)
                : {
                    disabled: false,
                    name: module
                };

            this.modules.set(module, {
                commands: [],
                events: [],
                meta
            });

            if (meta.disabled) continue;

            const events = resolve(path, "events");
            if (existsSync(events)) {
                const evs = await this.client.events.load(events, module);
                this.modules.get(module)!.events.push(...evs);
            }
        }

        await this.client.login(token);

        for (const module of dirs) {
            if (this.modules.get(module)?.meta.disabled) continue;

            const path = resolve(this.path, module);
            const cmd = resolve(path, "commands");

            if (existsSync(cmd)) {
                const commands = await this.client.commands.load(cmd, module);
                this.modules.get(module)!.commands.push(...commands);
            }
        }
    }
}
