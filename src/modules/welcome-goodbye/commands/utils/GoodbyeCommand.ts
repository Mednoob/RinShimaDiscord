import WGModel, { WelcomeGoodbye } from "../../models/WelcomeGoodbye";
import { CommandContext } from "#rin/structures/CommandContext";
import { placeholders, replace } from "../../utils/placeholder";
import { createEmbed } from "#rin/utils/functions/createEmbed";
import { BaseCommand } from "#rin/structures/BaseCommand";
import { Command } from "#rin/utils/decorators/Command";
import { GuildMember } from "discord.js";

@Command<typeof GoodbyeCommand>({
    aliases: ["gbye"],
    description: "Configure goodbye message feature",
    name: "goodbye",
    slash: {
        options: [
            {
                description: "Enable goodbye message",
                name: "enable",
                type: "SUB_COMMAND"
            },
            {
                description: "Disable goodbye message",
                name: "disable",
                type: "SUB_COMMAND"
            },
            {
                description: "View or set the goodbye message channel",
                name: "channel",
                options: [
                    {
                        description: "New channel",
                        name: "new-channel",
                        type: "CHANNEL",
                        channelTypes: ["GUILD_TEXT"]
                    }
                ],
                type: "SUB_COMMAND"
            },
            {
                description: "View or set the goodbye message",
                name: "message",
                options: [
                    {
                        description: "New message",
                        name: "new-message",
                        type: "STRING"
                    }
                ],
                type: "SUB_COMMAND"
            },
            {
                description: "View list of placeholders",
                name: "placeholders",
                type: "SUB_COMMAND"
            }
        ]
    },
    usage: "{prefix}goodbye"
})
export class GoodbyeCommand extends BaseCommand {
    private readonly subCmdListEmbed = createEmbed("info");
    private readonly phFuncs: ((member: GuildMember) => string)[] = placeholders.map(ph => {
        const str = `${ph.placeholders.map(x => `\`${x}\``).join(", ")} - ${ph.description}`;

        return member => `${str}. Preview: ${replace(ph.placeholders[0], member)}`;
    });

    private readonly options: Record<string, (ctx: CommandContext, data: WelcomeGoodbye | null) => Promisable<any>> = {
        channel: async (ctx, data) => {
            const chId = ctx.options?.getChannel("new-channel")?.id ??
                        ctx.args.shift()?.replace(/[^\d]/g, "") ?? "_";

            const ch = await ctx.guild?.channels.fetch(chId).catch(() => null);
            if (!ch) {
                return ctx.reply({
                    embeds: [
                        createEmbed(
                            "info",
                            data?.goodbye?.channelId
                                ? `Goodbye message channel is currently set to <#${data.goodbye.channelId}>`
                                : "Goodbye message channel is not set"
                        )
                            .setFooter({
                                text: "To set a new channel, use this command again with the new channel as argument"
                            })
                    ]
                });
            }

            const newData = (await WGModel.findOneAndUpdate({ guildId: ctx.guild!.id }, {
                guildId: ctx.guild!.id,
                "goodbye.channelId": ch.id
            }, {
                new: true,
                upsert: true
            }))!;

            const embed = createEmbed("success", `Goodbye message channel set to <#${ch.id}>`, true);

            GoodbyeCommand.addFooter(ctx, embed, newData);

            return ctx.reply({
                embeds: [embed]
            });
        },
        default: ctx => ctx.reply({
            embeds: [this.subCmdListEmbed]
        }),
        disable: async ctx => {
            await WGModel.findOneAndUpdate({ guildId: ctx.guild!.id }, {
                guildId: ctx.guild!.id,
                "goodbye.enabled": false
            }, {
                new: true,
                upsert: true
            });

            return ctx.reply({
                embeds: [createEmbed("success", "Goodbye message feature disabled", true)]
            });
        },
        enable: async ctx => {
            const newData = (await WGModel.findOneAndUpdate({ guildId: ctx.guild!.id }, {
                guildId: ctx.guild!.id,
                "goodbye.enabled": true
            }))!;

            const embed = createEmbed("success", "Goodbye message feature enabled", true);

            GoodbyeCommand.addFooter(ctx, embed, newData);

            return ctx.reply({
                embeds: [embed]
            });
        },
        message: async (ctx, data) => {
            const newMsg = ctx.options?.getString("new-message") ?? ctx.args.join(" ");
            if (!newMsg) {
                const embed = createEmbed("info");

                if (data?.goodbye?.msg) {
                    embed.addFields([
                        {
                            name: "Original",
                            value: data.goodbye.msg
                        },
                        {
                            name: "Replaced",
                            value: replace(data.goodbye.msg, ctx.member!)
                        }
                    ]);
                } else {
                    embed.setDescription("Goodbye message hasn't been set");
                }

                embed.setFooter({
                    text: "To change the goodbye message, use this command again with the new message as argument"
                });

                return ctx.reply({
                    embeds: [embed]
                });
            }

            const newData = (await WGModel.findOneAndUpdate({ guildId: ctx.guild!.id }, {
                guildId: ctx.guild!.id,
                "goodbye.msg": newMsg
            }, {
                new: true,
                upsert: true
            }))!;

            const embed = createEmbed("success", "Goodbye message has been changed!", true);

            GoodbyeCommand.addFooter(ctx, embed, newData);

            return ctx.reply({
                embeds: [embed]
            });
        },
        placeholders: ctx => ctx.reply({
            embeds: [
                createEmbed("info", this.phFuncs.map(f => f(ctx.member!)).join("\n"))
                    .setTitle("Placeholders")
            ]
        })
    };

    public constructor(client: BaseCommand["client"], meta: BaseCommand["meta"]) {
        super(client, meta);

        for (const subData of meta.slash?.options ?? []) {
            let str = subData.name;

            if ("options" in subData) {
                str += ` ${subData.options!
                    .map(x => ("required" in x && x.required ? `<${x.name}>` : `[${x.name}]`))
                    .join(" ")}`;
            }

            this.subCmdListEmbed.addField(str, subData.description);
        }
    }

    public async execute(ctx: CommandContext): Promise<any> {
        if (ctx.isInteraction() && !ctx.deferred) await ctx.deferReply();

        const data = await WGModel.findOne({ guildId: ctx.guild!.id });
        const option = ctx.options?.getSubcommand() ?? ctx.args.shift() ?? "default";

        return this.options[option in this.options ? option : "default"](ctx, data);
    }

    private static addFooter(
        ctx: CommandContext,
        embed: ReturnType<typeof createEmbed>,
        data: WelcomeGoodbye
    ): void {
        if (!data.goodbye?.enabled) {
            embed.setFooter({
                text: `Goodbye message feature is disabled. Use \`${ctx.prefix}goodbye enable\` to enable it`
            });
        } else if (!data.goodbye.msg) {
            embed.setFooter({
                text: `Goodbye message is not set. Use \`${ctx.prefix}goodbye message <new-message>\` to set it`
            });
        } else if (!data.goodbye.channelId) {
            embed.setFooter({
                text: `Goodbye message channel is not set. Use \`${ctx.prefix}goodbye channel <new-channel>\` to set it`
            });
        }
    }
}
