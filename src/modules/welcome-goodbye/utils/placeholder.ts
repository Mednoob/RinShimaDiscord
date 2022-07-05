import { escapeRegexp } from "#rin/utils/functions/escapeRegexp";
import { GuildMember } from "discord.js";

interface PlaceholderData {
    description: string;
    placeholders: string[];
    replacement: (member: GuildMember) => string;
}

export let placeholders: PlaceholderData[] = [
    {
        description: "User mention",
        placeholders: ["{user}"],
        replacement: member => `<@${member.id}>`
    },
    {
        description: "Server name",
        placeholders: ["{server}"],
        replacement: member => member.guild.name
    },
    {
        description: "User tag",
        placeholders: ["{tag}"],
        replacement: member => member.user.tag
    },
    {
        description: "User discriminator",
        placeholders: ["{discriminator}", "{discrim}"],
        replacement: member => member.user.discriminator
    },
    {
        description: "User username",
        placeholders: ["{username}"],
        replacement: member => member.user.username
    },
    {
        description: "Amount of members in the server",
        placeholders: ["{members}"],
        replacement: member => member.guild.memberCount.toString()
    }
];

placeholders = placeholders.map(p => ({
    ...p,
    placeholders: p.placeholders.map(x => escapeRegexp(x))
}));

export function replace(str: string, member: GuildMember): string {
    for (const data of placeholders) {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        if (data.placeholders.some(p => str.includes(p))) {
            str = str.replace(
                new RegExp(data.placeholders.join("|"), "g"),
                data.replacement(member)
            );
        }
    }

    return str;
}
