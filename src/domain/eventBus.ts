import mitt, { type Handler } from 'mitt'
// git hub mitt

export const eventbus = mitt()


export enum Events {
    userSignin = "user-signin",
    checkoutPerformed = "checkoutPerformed"
}

export function registerEventHandler(eventName: Events, cb: Handler<unknown>) {
    console.log(`Register event handler for  ${eventName}`)
    eventbus.on(eventName, cb)
}

/**
 * 
const emitter = mitt<Events>(); // inferred as Emitter<Events>

emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'

emitter.emit('foo', 42); // Error: Argument of type 'number' is not assignable to parameter of type 'str
 */
