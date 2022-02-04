import { BaseCommand } from "../../../structures/BaseCommand";
import { CommandQueryContext } from "../../../structures/CommandQueryContext";
import { Query } from "../../../utils/decorators/commands";

@Query({
    identifier: "Help A"
})
export default class HelpCommand extends BaseCommand {
    public execute(context: CommandQueryContext): void {
        void context.reply({
            content: "Hello! This is Help A"
        });
    }
}
