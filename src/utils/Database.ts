import { createConnection, Connection } from "typeorm";
import { resolve } from "path";

export class Database<Ready extends boolean = false> {
    private connection!: Ready extends true ? Connection : (Connection | undefined);

    public async connect(): Promise<Database<true>> {
        this.connection = await createConnection({
            entities: [
                resolve(__dirname, "..", "entities", "*.{ts,js}")
            ],
            logging: "all",
            type: "mongodb",
            useUnifiedTopology: true
        });

        return this as Database<true>;
    }

    public isConnected(): this is Database<true> {
        return this.connection !== undefined;
    }
}
