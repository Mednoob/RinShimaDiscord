import { BaseCommand } from "../../structures/BaseCommand";
import { CommandQueryContext } from "../../structures/CommandQueryContext";

export default class OwOifyCommand extends BaseCommand {
    public constructor(rin: BaseCommand["rin"]) {
        super(rin, {
            query: "owoify",
            type: "text"
        });
    }

    public execute(ctx: CommandQueryContext): void {
        if (!ctx.args.length) {
            void ctx.reply({
                content: "Please, give me the text to owoify."
            });
            return;
        }

        void ctx.reply({
            embeds: [
                this.rin.utils.createEmbed("success", ctx.args.join(" ").replace(/[lr]/gi, "w"))
            ]
        });
    }
}
