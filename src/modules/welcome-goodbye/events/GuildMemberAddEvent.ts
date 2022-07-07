import { BaseEvent } from "#rin/structures/BaseEvent";
import WelcomeGoodbye from "../models/WelcomeGoodbye";
import { Event } from "#rin/utils/decorators/Event";
import { replace } from "../utils/placeholder";
import { GuildMember } from "discord.js";

@Event("guildMemberAdd")
export class GuildMemberAddEvent extends BaseEvent {
    public async execute(member: GuildMember): Promise<void> {
        const data = await WelcomeGoodbye.findOne({ guildId: member.guild.id });

        if (data?.welcome?.enabled && data.welcome.channelId && data.welcome.msg) {
            const ch = await member.guild.channels.fetch(data.welcome.channelId).catch(() => null);
            if (ch?.isText()) {
                await ch.send(replace(data.welcome.msg, member));
            }
        }
    }
}
