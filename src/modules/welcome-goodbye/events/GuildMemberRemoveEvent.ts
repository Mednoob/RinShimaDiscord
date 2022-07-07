import { BaseEvent } from "#rin/structures/BaseEvent";
import WelcomeGoodbye from "../models/WelcomeGoodbye";
import { Event } from "#rin/utils/decorators/Event";
import { replace } from "../utils/placeholder";
import { GuildMember } from "discord.js";

@Event("guildMemberRemove")
export class GuildMemberRemoveEvent extends BaseEvent {
    public async execute(member: GuildMember): Promise<void> {
        const data = await WelcomeGoodbye.findOne({ guildId: member.guild.id });

        if (data?.goodbye?.enabled && data.goodbye.channelId && data.goodbye.msg) {
            const ch = await member.guild.channels.fetch(data.goodbye.channelId).catch(() => null);
            if (ch?.isText()) {
                await ch.send(replace(data.goodbye.msg, member));
            }
        }
    }
}
