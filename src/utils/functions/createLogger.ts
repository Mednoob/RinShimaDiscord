import pretty from "pino-pretty";
import pino from "pino";

type ProcessType = { type: "manager" } | { type: "shard"; shardId: number };
type LoggerOptions = ProcessType & {
    name: string;
    dev?: boolean;
};

export const createLogger = (options: LoggerOptions): pino.Logger => pino({
    name: options.name,
    timestamp: true,
    level: options.dev ? "debug" : "info",
    hooks: {
        logMethod(args, method) {
            method.apply(this, [args.join(" ")]);
        }
    },
    formatters: {
        bindings: () => ({
            pid: options.type === "shard" ? `Shard #${options.shardId}` : "Manager"
        })
    }
}, pretty({
    translateTime: "SYS:yyyy-MM-dd HH:mm:ss"
}));