import { BaseCommand } from "../../structures/BaseCommand";
import { CommandQueryContext } from "../../structures/CommandQueryContext";
import { Query } from "../../utils/decorators/commands";

@Query({
    identifier: "OwOify"
})
export default class OwOifyCommand extends BaseCommand {
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
