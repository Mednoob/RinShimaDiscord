import { BaseCommand } from "../../../structures/BaseCommand";
import { CommandQueryContext } from "../../../structures/CommandQueryContext";

export default class HelpCommand extends BaseCommand {
    public constructor(rin: BaseCommand["rin"]) {
        super(rin, {
            query: "helpA",
            type: "text"
        });
    }

    public execute(context: CommandQueryContext): void {
        void context.reply({
            content: "Hello! This is Help A"
        });
    }
}
