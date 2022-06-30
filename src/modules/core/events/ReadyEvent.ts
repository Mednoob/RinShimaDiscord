import { BaseEvent } from "../../../structures/BaseEvent";
import { Event } from "../../../utils/decorators/Event";

@Event("ready")
export class ReadyEvent extends BaseEvent {
    public execute(): void {
        this.client.logger.info(`Logged in as ${this.client.user!.tag}`);
    }
}
