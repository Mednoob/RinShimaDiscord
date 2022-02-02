import { BaseCommand } from "../../structures/BaseCommand";
import { MethodDecorator } from "../../typings";
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
