import { Collection, CommandInteractionOption, Interaction, InteractionReplyOptions, Message, ReplyMessageOptions } from "discord.js";

export type ContextType = "autocomplete"|"user_context"|"message_context"|"button"|"select_menu"|"slash"|"message"|"unknown";

export class CommandQueryContext {
    public readonly additionalArgs: Collection<string, symbol|object> = new Collection();

    public constructor(public readonly context: Message|Interaction, public readonly args: string[]) {}

    public async reply(options: InteractionReplyOptions|ReplyMessageOptions): Promise<Message|void> {
        if ((this.context as { reply?: (...a: any[]) => any }).reply) {
            return (this.context as { reply: (...a: any[]) => any }).reply(options);
        }
    }

    public get type(): ContextType {
        if (this.isMessage()) return "message";
        if (this.isInteraction()) {
            if (this.context.isCommand()) return "slash";
            if (this.context.isAutocomplete()) return "autocomplete";
            if (this.context.isButton()) return "button";
            if (this.context.isSelectMenu()) return "select_menu";
            if (this.context.isContextMenu()) return "user_context";
            if (this.context.isMessageComponent()) return "message_context";
        }

        return "unknown";
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
