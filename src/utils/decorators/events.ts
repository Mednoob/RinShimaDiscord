import { BaseEvent } from "../../structures/BaseEvent";
import { ClassDecorator } from "../../typings";
import { ClientEvents } from "discord.js";

type ExtendedEventConstructor = new (...args: ConstructorParameters<typeof BaseEvent>) => BaseEvent;
export function Event(name: keyof ClientEvents): ClassDecorator<ExtendedEventConstructor, ExtendedEventConstructor> {
    return target => new Proxy(target, {
        construct: (
            trgt,
            args: [BaseEvent["rin"]]
        ) => new trgt(...args, name)
    });
}
