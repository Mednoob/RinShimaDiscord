import { BaseCommand } from "../structures/BaseCommand";
import { BaseEvent } from "../structures/BaseEvent";
import { ActivityOptions, ApplicationCommandOptionData, Collection, Guild } from "discord.js";

export interface SlashOption {
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
    defaultPermission?: boolean;
    description?: string;
    name?: string;
}

export interface CommandMeta {
    readonly category?: string;
    readonly path?: string;
    contextChat?: string;
    contextUser?: string;
    description?: string;
    slash?: SlashOption;
    aliases?: string[];
    cooldown?: number;
    disable?: boolean;
    devOnly?: boolean;
    usage?: string;
    name: string;
}

export interface CategoryMeta {
    name: string;
    hide: boolean;
    cmds: Collection<string, BaseCommand>;
}

interface RegisterCmdOptions {
    onRegistered: (guild: Guild) => Promisable<any>;
    onError: (guild: Guild | null, error: Error) => Promisable<any>;
}

export interface PresenceData {
    activities: ActivityOptions[];
    status: ClientPresenceStatus[];
    interval: number;
}

export interface Module {
    meta: {
        name: string;
        disabled: boolean;
    };
    commands: BaseCommand[];
    events: BaseEvent[];
}

export type ClassDecorator<Target extends Constructor, Result = unknown> = (target: Target) => Result;

type Constructor<Result = unknown> =
    | NonAbstractConstructor<Result>
    | (abstract new (...args: any[]) => Result);
type NonAbstractConstructor<Result = unknown> = new (...args: any[]) => Result;

declare global {
    type Promisable<T> = Promise<T> | T;
}
