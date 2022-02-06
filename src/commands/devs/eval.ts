import { BaseCommand } from "../../structures/BaseCommand";
import { CommandQueryContext } from "../../structures/CommandQueryContext";
import { devOnly, Query } from "../../utils/decorators/commands";
import { inspect } from "util";

@Query({
    identifier: "Eval"
})
export default class EvalCommand extends BaseCommand {
    @devOnly
    public async execute(ctx: CommandQueryContext): Promise<void> {
        if (!ctx.args.length) {
            void ctx.reply({
                content: "Please, give me the code to eval."
            });
            return;
        }

        try {
            const before = Date.now();
            // eslint-disable-next-line no-eval
            const res = await eval(ctx.args.join(" "));
            const after = Date.now();
            void ctx.reply({
                embeds: [
                    this.rin.utils.createEmbed("success", `\`\`\`${inspect(res, { depth: 1 })}\`\`\``)
                        .setAuthor({
                            name: `${after - before}ms`
                        })
                        .addField(
                            "Type",
                            `\`\`\`${typeof res}\`\`\``
                        )
                ]
            });
        } catch (e) {
            void ctx.reply({
                content: `An error occured while evaluating the code:\n\`\`\`\n${inspect(e, { depth: 0 })}\n\`\`\``
            });
        }
    }
}
