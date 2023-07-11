import mitt from 'mitt'
// git hub mitt

export const eventbus = mitt()

export enum Events {
    userSignin = "user-signin"
}

/**
 * 
const emitter = mitt<Events>(); // inferred as Emitter<Events>

emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'

emitter.emit('foo', 42); // Error: Argument of type 'number' is not assignable to parameter of type 'str
 */
