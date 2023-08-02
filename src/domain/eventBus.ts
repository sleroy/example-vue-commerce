import mitt, { type EventType, type Handler } from 'mitt'
// git hub mitt

export const eventbus = mitt()

export enum Events {
  calc_started = "CALC_STARTED",
  calc_terminated = "CALC_TERMINATED",
  calc_new_offsite = "calc_new_offsite",
  calc_new_line_budget = "calc_new_line_budget",
  error = "error"
}

export function registerEventHandler(eventName: Events, cb: Handler<unknown>) {
    console.log(`Register event handler for  ${String(eventName)}`)
    eventbus.on(eventName, (e) => {
        console.log(`[${String(eventName)}] received with `, {e})
        cb(e)
    })
}

/**
 * 
const emitter = mitt<Events>(); // inferred as Emitter<Events>

emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'

emitter.emit('foo', 42); // Error: Argument of type 'number' is not assignable to parameter of type 'str
 */
