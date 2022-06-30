import { BaseEvent } from "../../structures/BaseEvent";
import { Rin } from "../../structures/Rin";
import { ClientEvents, Collection } from "discord.js";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

export class EventsLoader {
    public readonly events = new Collection<keyof ClientEvents, BaseEvent[]>();

    public constructor(public readonly client: Rin) {}

    public async load(path: string, module: string): Promise<BaseEvent[]> {
        const events = await readdir(resolve(path));
        this.client.logger.info(`Loading ${events.length} events from ${module} module...`);

        const evs: BaseEvent[] = [];

        for (const file of events) {
            const event = await this.client.utils.import<BaseEvent>(resolve(path, file), this.client);
            if (!event) {
                this.client.logger.error(`File ${file} is not a valid event file.`);
                continue;
            }

            this.add(event);
            evs.push(event);

            this.client.logger.info(`Listener for event ${event.name} from module ${module} has been added`);
        }

        return evs;
    }

    public add(event: BaseEvent): void {
        if (!this.events.has(event.name)) {
            this.events.set(event.name, []);
            this.client.on(event.name, (...args) => {
                for (const listener of this.events.get(event.name)!) {
                    listener.execute(...args);
                }
            });
        }

        this.events.get(event.name)!.push(event);
    }
}
