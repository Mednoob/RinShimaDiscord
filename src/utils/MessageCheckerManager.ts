import { Rin } from "../structures/Rin";
import { Message } from "discord.js";
import { readdirSync } from "fs";
import { resolve } from "path";

export type MessageChecker = (message: Message) => void;

export class MessageCheckerManager {
    public readonly checkers: MessageChecker[] = [];

    public constructor(public readonly rin: Rin, private readonly basePath: string) {}

    public async load(): Promise<void> {
        try {
            const files = readdirSync(this.basePath);

            for (const file of files) {
                const fileData = (await import(resolve(this.basePath, file))) as { default: MessageChecker | undefined };
                if (!fileData.default) continue;

                this.checkers.push(fileData.default);
            }
        } catch {
            console.log("Failed to load message checkers");
        }
    }
}
