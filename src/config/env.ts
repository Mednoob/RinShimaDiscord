import { defaultPrefix } from "./constants";

// Boolean values
export const enableSlashCommand = process.env.ENABLE_SLASH_COMMAND !== "no";
export const isDev = process.env.NODE_ENV === "development";

// String values
export const prefix = isDev ? "r>" : defaultPrefix;
