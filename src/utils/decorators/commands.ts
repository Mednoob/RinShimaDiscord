import { BaseCommand } from "../../structures/BaseCommand";
import { ClassDecorator, CommandQuery, MethodDecorator, Promisable } from "../../typings";
import { ClientUtils } from "../ClientUtils";
import * as config from "../../config";
import { PermissionString } from "discord.js";

function createQueryExecutionDecorator(
    func: (...args: Parameters<BaseCommand["execute"]>) => Promisable<boolean | undefined>
): MethodDecorator<BaseCommand, void> {
    return (target, _, descriptor) => {
        const originalMethod = descriptor.value as BaseCommand["execute"];

        descriptor.value = async function value(...args: Parameters<BaseCommand["execute"]>) {
            const res = await func(...args);
            if (res === false) return;

            return originalMethod.apply(this, args);
        };
    };
}

export function requirePermissions(permissions: PermissionString[]): MethodDecorator<BaseCommand, void> {
    return createQueryExecutionDecorator(ctx => {
        if (!ctx.member?.permissions.has(permissions)) {
            void ctx.reply({
                embeds: [
                    ClientUtils.createEmbed("danger", "You don't have the required permissions to execute this command.")
                ]
            });
            return false;
        }
    });
}

export const devOnly = createQueryExecutionDecorator(
    ctx => config.devs.includes(ctx.author.id)
);

export const nsfwOnly = createQueryExecutionDecorator(ctx => {
    if (ctx.context.channel?.type === "GUILD_TEXT") return ctx.context.channel.nsfw;

    return false;
});

type ExtendedCommandConstructor = new (...args: ConstructorParameters<typeof BaseCommand>) => BaseCommand;
export function Query(query: CommandQuery): ClassDecorator<ExtendedCommandConstructor, ExtendedCommandConstructor> {
    return target => new Proxy(target, {
        construct: (
            trgt,
            args: [BaseCommand["rin"]]
        ) => new trgt(...args, query)
    });
}
