/**
 * Восстанавливает класс из JSON-данных
 * @param obj - JSON-строка или готовый объект
 * @param base - Класс для восстановления
 * @returns Восстановленный объект на основе данных из JSON-строки
 */
export function restoreClass<T>(obj: string | unknown, base: any): T {
  const source = typeof obj === "string" ? JSON.parse(obj) : obj;
  return Object.create(
    base.prototype,
    Object.getOwnPropertyDescriptors(source)
  ) as T;
}
