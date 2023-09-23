import EventEmitter from "events";

const __emitter = new EventEmitter();
__emitter.setMaxListeners(0); // unlimit listener

export const emitter = __emitter;
