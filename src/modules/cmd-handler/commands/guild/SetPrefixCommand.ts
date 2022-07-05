import { CommandContext } from "#rin/structures/CommandContext";
import { createEmbed } from "#rin/utils/functions/createEmbed";
import { BaseCommand } from "#rin/structures/BaseCommand";
import { Command } from "#rin/utils/decorators/Command";
import GuildPrefix from "../../models/GuildPrefix";

@Command({
    aliases: ["setpref"],
    description: "Sets the prefix for the guild (use `disable` as prefix to turn off)",
    name: "setprefix",
    slash: {
        options: [
            {
                description: "New prefix for the guild",
                name: "prefix",
                required: true,
                type: "STRING"
            }
        ]
    },
    usage: "{prefix}setprefix <new-prefix>"
})
export class SetPrefixCommand extends BaseCommand {
    public async execute(ctx: CommandContext): Promise<void> {
        if (ctx.isInteraction() && !ctx.deferred) await ctx.deferReply();

        const pref = ctx.options?.getString("prefix") ?? ctx.args[0];
        if (!pref) {
            await ctx.reply({
                embeds: [createEmbed("error", "You must specify a prefix!", true)]
            });
            return;
        }

        const query = { guildId: ctx.guild!.id };

        if (pref === "disable") {
            await GuildPrefix.findOneAndDelete(query).catch(() => null);

            await ctx.reply({
                embeds: [createEmbed("info", "Prefix disabled!")]
            });

            return;
        }

        const find = await GuildPrefix.findOne(query);
        try {
            if (find) {
                await GuildPrefix.findOneAndUpdate(query, { prefix: pref });
            } else {
                await GuildPrefix.create({
                    ...query,
                    prefix: pref
                });
            }
        } catch {
            await ctx.reply({
                embeds: [createEmbed("error", "An error occurred while setting the prefix!")]
            });

            return;
        }

        await ctx.reply({
            embeds: [createEmbed("info", `Prefix set to \`${pref}\``, true)]
        });
    }
}
