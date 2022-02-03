import { BaseCommand } from "../../structures/BaseCommand";
import { ClassDecorator, CommandQuery, MethodDecorator } from "../../typings";
import { PermissionString } from "discord.js";

export function requirePermissions(permissions: PermissionString[]): MethodDecorator<BaseCommand, void> {
    return (target, _, descriptor) => {
        const originalMethod = target.execute.bind(target);

        descriptor.value = function value(context: Parameters<BaseCommand["execute"]>[0]) {
            if (!context.member?.permissions.has(permissions)) {
                return context.reply({
                    content: "You don't have the required permissions to use this command."
                });
            }

            return originalMethod.apply(this, [context]);
        };
    };
}

type ExtendedCommandConstructor = new (...args: ConstructorParameters<typeof BaseCommand>) => BaseCommand;
export function Query(query: CommandQuery): ClassDecorator<ExtendedCommandConstructor, ExtendedCommandConstructor> {
    return target => new Proxy(target, {
        construct: (
            trgt,
            args: [BaseCommand["rin"]]
        ) => new (trgt as new (rin: BaseCommand["rin"], query: CommandQuery) => BaseCommand)(...args, query)
    });
}
