import { Collection, CommandInteractionOption, Interaction, InteractionReplyOptions, Message, ReplyMessageOptions } from "discord.js";

export class CommandQueryContext {
    public readonly additionalArgs: Collection<string, symbol|object> = new Collection();

    public constructor(public readonly context: Message|Interaction, public readonly args: string[]) {}

    public async reply(options: InteractionReplyOptions|ReplyMessageOptions): Promise<Message|void> {
        if ((this.context as { reply?: (...a: any[]) => any }).reply) {
            return (this.context as { reply: (...a: any[]) => any }).reply(options);
        }
    }

    public get options(): CommandInteractionOption|undefined {
        return (this.context as { options?: CommandInteractionOption }).options;
    }

    public isInteraction(): this is InteractionCommandQueryContext {
        return this.context instanceof Interaction;
    }

    public isMessage(): this is MessageCommandQueryContext {
        return this.context instanceof Message;
    }
}

export type InteractionCommandQueryContext = CommandQueryContext & { context: Interaction; reply: (options: InteractionReplyOptions) => Promise<Message|void> };
export type MessageCommandQueryContext = CommandQueryContext & { context: Message; reply: (options: ReplyMessageOptions) => Promise<Message|void>};
