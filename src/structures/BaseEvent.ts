import { Rin } from "./Rin";
import { ClientEvents } from "discord.js";

export abstract class BaseEvent {
    public constructor(public readonly client: Rin, public readonly name: keyof ClientEvents) {}

    public abstract execute(...args: unknown[]): Promisable<any>;
}

export type EventConstructor = new (...args: ConstructorParameters<typeof BaseEvent>) => BaseEvent;
