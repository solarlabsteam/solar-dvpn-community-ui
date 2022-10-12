import emitter from "tiny-emitter/instance";

const globalEmitter = {
  $on: (eventName: string, ...args: any[]) => emitter.on(eventName, ...args),
  $once: (eventName: string, ...args: any[]) =>
    emitter.once(eventName, ...args),
  $off: (eventName: string, ...args: any[]) => emitter.off(eventName, ...args),
  $emit: (eventName: string, ...args: any[]) =>
    emitter.emit(eventName, ...args),
};

export default function useGlobalEmitter() {
  return globalEmitter;
}
