import { BaseCommand } from "../../structures/BaseCommand";
import { CommandQueryContext } from "../../structures/CommandQueryContext";
import { Query } from "../../utils/decorators/commands";

@Query({
    query: "stats",
    type: "text"
})
export default class StatsCommand extends BaseCommand {
    public execute(ctx: CommandQueryContext): void {
        void ctx.reply({
            embeds: [
                this.rin.utils.createEmbed("info")
                    .addFields([
                        {
                            name: "Bot",
                            value: `WS Ping: ${this.rin.ws.ping}`
                        }
                    ])
            ]
        });
    }
}
