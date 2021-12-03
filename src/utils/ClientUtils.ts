import { ColorResolvable, MessageEmbed } from "discord.js";
import got from "got";

type embedColorType = "info" | "success" | "warning" | "danger";
const embedColors: Record<embedColorType, string> = {
    info: "3CAAFF",
    success: "GREEN",
    warning: "YELLOW",
    danger: "RED"
};

function createEmbed(type: embedColorType, message?: string): MessageEmbed {
    const embed = new MessageEmbed()
        .setColor(embedColors[type] as ColorResolvable);

    if (message) embed.setDescription(message);
    return embed;
}

export class ClientUtils {
    public static readonly createEmbed = createEmbed;
    public static readonly REST = got;
    public readonly createEmbed = createEmbed;
    public readonly REST = got;
}
