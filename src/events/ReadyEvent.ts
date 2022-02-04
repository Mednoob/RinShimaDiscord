import { BaseEvent } from "../structures/BaseEvent";
import { Event } from "../utils/decorators/events";

@Event("ready")
export class ReadyEvent extends BaseEvent {
    public run(): void {
        console.log(`Logged in as ${this.rin.user!.tag}`);
        void this.rin.checkers.message.load();
        void this.rin.checkers.interaction.load();
        this.rin.commands.load();
    }
}
