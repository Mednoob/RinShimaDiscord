import { BaseEvent } from "../structures/BaseEvent";
import { Event } from "../utils/decorators/events";
import { Message } from "discord.js";


@Event("messageCreate")
export class MessageCreateEvent extends BaseEvent {
    public run(message: Message): void {
        if (message.content.startsWith(this.rin.config.prefix)) {
            this.rin.commands.handle(message);
        }
    }
}
