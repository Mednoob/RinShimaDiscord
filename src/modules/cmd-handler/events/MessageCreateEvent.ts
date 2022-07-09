import { createEmbed } from "#rin/utils/functions/createEmbed";
import { BaseEvent } from "#rin/structures/BaseEvent";
import { Event } from "#rin/utils/decorators/Event";
import GuildPrefix from "../models/GuildPrefix";
import { Message, User } from "discord.js";

@Event<typeof MessageCreateEvent>("messageCreate")
export class MessageCreateEvent extends BaseEvent {
    public async execute(message: Message): Promise<void> {
        if (message.author.bot || message.channel.type === "DM") return;

        const data = await GuildPrefix.findOne({ guildId: message.guildId });
        if (data && message.content.startsWith(data.prefix)) {
            return this.client.commands.handle(message, data.prefix);
        } else if (message.content.startsWith(this.client.config.prefix)) {
            return this.client.commands.handle(message, this.client.config.prefix);
        }

        if (this.getUserFromMention(message.content)?.id === this.client.user?.id) {
            message.reply({
                embeds: [createEmbed("info", `:wave: **|** Hi ${message.author.toString()}, my prefix is **\`${this.client.config.prefix}\`**`)]
            }).catch(e => this.client.logger.error("PROMISE_ERR:", e));
        }
    }

    private getUserFromMention(mention: string): User | undefined {
        // eslint-disable-next-line prefer-named-capture-group
        const matches = (/^<@!?(\d+)>$/).exec(mention);
        if (!matches) return undefined;

        const id = matches[1];
        return this.client.users.cache.get(id);
    }
}
