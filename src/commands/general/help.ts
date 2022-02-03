import { BaseCommand } from "../../structures/BaseCommand";
import { CommandQueryContext } from "../../structures/CommandQueryContext";
import { Query } from "../../utils/decorators/commands";

@Query({
    query: "help",
    type: "text"
})
export default class HelpCommand extends BaseCommand {
    public execute(context: CommandQueryContext): void {
        void context.reply({
            content: `Hello! Args: ${context.args.join(" ") || "No Args Provided"}`
        });
    }
}
