import { BaseEvent } from "../structures/BaseEvent";
import { Rin } from "../structures/Rin";
import { readdirSync } from "fs";
import { resolve } from "path";

export class EventManager {
    public constructor(public readonly rin: Rin, private readonly basePath: string) {}

    public async load(): Promise<void> {
        const files = readdirSync(this.basePath);

        for (const file of files) {
            const fileData = await import(resolve(this.basePath, file));

            if (!fileData[file.slice(0, -3)]) continue;

            const event = (new fileData[file.slice(0, -3)](this.rin)) as BaseEvent<"message">;
            this.rin.addListener(event.name, event.run.bind(event));
            console.info(`Loaded event ${event.name}`);
        }
    }
}