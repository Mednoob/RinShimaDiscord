import { BaseCommand } from "../../structures/BaseCommand";
import { CommandQueryContext } from "../../structures/CommandQueryContext";

export default class StatsCommand extends BaseCommand {
    public constructor(rin: BaseCommand["rin"]) {
        super(rin, {
            query: "stats",
            type: "text"
        });
    }

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
