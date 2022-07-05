import { BaseEvent } from "#rin/structures/BaseEvent";
import { Event } from "#rin/utils/decorators/Event";
import mongoose from "mongoose";

@Event("ready")
export class ReadyEvent extends BaseEvent {
    public execute(): void {
        this.client.logger.info(`Logged in as ${this.client.user!.tag}`);

        mongoose.connect(process.env.MONGO_URL!, {
            dbName: this.client.config.dbName
        }, err => {
            if (err) {
                this.client.logger.error(err);
            } else {
                this.client.logger.info("Connected to MongoDB");
            }
        });
    }
}
