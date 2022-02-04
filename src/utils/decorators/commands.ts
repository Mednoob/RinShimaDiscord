import { BaseCommand } from "../../structures/BaseCommand";
import { ClassDecorator, CommandQuery, MethodDecorator, Promisable } from "../../typings";
import { PermissionString } from "discord.js";

function createQueryExecutionDecorator(
    func: (query: BaseCommand, ...args: Parameters<BaseCommand["execute"]>) => Promisable<boolean | undefined>
): MethodDecorator<BaseCommand, void> {
    return (target, _, descriptor) => {
        const originalMethod = target.execute.bind(target);

        descriptor.value = async function value(...args: Parameters<BaseCommand["execute"]>) {
            const res = await func(target, ...args);
            if (res === false) return;

            return originalMethod(...args);
        };
    };
}

export function requirePermissions(permissions: PermissionString[]): MethodDecorator<BaseCommand, void> {
    return createQueryExecutionDecorator((query, ctx) => {
        if (!ctx.member?.permissions.has(permissions)) {
            void ctx.reply({
                embeds: [
                    query.rin.utils.createEmbed("danger", "You don't have the required permissions to execute this command.")
                ]
            });
            return false;
        }
    });
}

export function devOnly(): MethodDecorator<BaseCommand, void> {
    return createQueryExecutionDecorator((query, ctx) => query.rin.config.devs.includes(ctx.author.id));
}

export function nsfwOnly(): MethodDecorator<BaseCommand, void> {
    return createQueryExecutionDecorator((query, ctx) => {
        if (ctx.context.channel?.type === "GUILD_TEXT") return ctx.context.channel.nsfw;

        return false;
    });
}

type ExtendedCommandConstructor = new (...args: ConstructorParameters<typeof BaseCommand>) => BaseCommand;
export function Query(query: CommandQuery): ClassDecorator<ExtendedCommandConstructor, ExtendedCommandConstructor> {
    return target => new Proxy(target, {
        construct: (
            trgt,
            args: [BaseCommand["rin"]]
        ) => new trgt(...args, query)
    });
}
