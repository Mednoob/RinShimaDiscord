/* eslint-disable class-methods-use-this */
import { Rin } from "../../structures/Rin";
import { pathToFileURL } from "node:url";
import { parse } from "node:path";

export class ClientUtils {
    public constructor(public readonly client: Rin) {}

    public decode(str: string): string {
        return Buffer.from(str, "base64").toString("ascii");
    }

    public async import<T>(path: string, ...args: any[]): Promise<T | undefined> {
        const file = await import(pathToFileURL(path).toString())
            .then(
                m => (m as Record<string, (new (...argument: any[]) => T) | undefined>)[parse(path).name]
            );
        return file ? new file(...(args as unknown[])) : undefined;
    }
}
