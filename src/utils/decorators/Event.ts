import { BaseEvent, EventConstructor } from "../../structures/BaseEvent";
import { ClassDecorator, NonAbstractConstructor } from "../../typings";

export function Event<T extends NonAbstractConstructor<any> = EventConstructor>(
    event: BaseEvent["name"]
): ClassDecorator<T, T> {
    return target => new Proxy(target, {
        construct: (
            trgt,
            args: [BaseEvent["client"]]
        ) => new trgt(...args, event)
    });
}
