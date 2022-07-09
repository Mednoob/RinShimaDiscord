import { CommandContext } from "./CommandContext";
import { CommandMeta } from "../typings";
import { Rin } from "./Rin";

export abstract class BaseCommand {
    public constructor(public readonly client: Rin, public meta: CommandMeta) {}

    public abstract execute(ctx: CommandContext): Promisable<any>;
}

export type CommandConstructor = new (...args: ConstructorParameters<typeof BaseCommand>) => BaseCommand;
