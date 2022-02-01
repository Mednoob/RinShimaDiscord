import { BaseCommand } from "../../structures/BaseCommand";
import { CommandQueryContext } from "../../structures/CommandQueryContext";
import { MessageAttachment } from "discord.js";
import sharp from "sharp";

export default class FlipCommand extends BaseCommand {
    public constructor(rin: BaseCommand["rin"]) {
        super(rin, {
            query: "flip",
            type: "text"
        });
    }

    public async execute(ctx: CommandQueryContext): Promise<void> {
        const url = (
            ctx.isMessage()
                ? ctx.context.attachments.first()?.url
                : undefined
        ) ?? (
            this.rin.utils.isUrl(ctx.args[0])
                ? ctx.args[0]
                : undefined
        ) ?? (
            this.rin.users.cache.get(ctx.args[0]?.replace(/[^0-9]/g, "")) ?? (
                // eslint-disable-next-line no-nested-ternary
                ctx.isMessage()
                    ? ctx.context.member!
                    : ctx.isInteraction()
                        ? ctx.context.user
                        : undefined
            )
        )?.displayAvatarURL({ size: 2048, format: "png" });
        const buff = await this.rin.utils.REST.get(url ?? "").buffer().catch(() => undefined);
        if (!buff) {
            void ctx.reply({
                embeds: [
                    this.rin.utils.createEmbed("danger", "Invalid image URL")
                ]
            });
            return;
        }

        try {
            const edited = await sharp(buff)
                .rotate(180)
                .png()
                .toBuffer();

            void ctx.reply({
                files: [
                    new MessageAttachment(edited, "flip.png")
                ]
            });
        } catch {
            void ctx.reply({
                embeds: [
                    this.rin.utils.createEmbed("danger", "Invalid image data")
                ]
            });
        }
    }
}
