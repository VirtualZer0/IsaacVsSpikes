import { reactive } from 'vue'

/** Выполнить полную копию объекта */
export default function reactiveCopy<T>(object: T | undefined, copyTo?: T): T {
  if (!object) {
    console.warn('ReactiveCopy gets undefined object')
  }

  return reactive(Object.assign(copyTo || {}, JSON.parse(JSON.stringify(object || {}))));
}