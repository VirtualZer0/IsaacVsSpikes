/**
 * Восстанавливает класс из JSON-данных
 * @param obj - JSON-строка или готовый объект
 * @param base - Класс для восстановления
 * @returns Восстановленный объект с привязкой к классу
 */
export function restoreClass<T extends object>(
  obj: string | unknown,
  base: Type<T>
): T {
  const source = typeof obj === 'string' ? JSON.parse(obj) : obj;
  return Object.create(
    base.prototype,
    Object.getOwnPropertyDescriptors(source)
  ) as T;
}

/**
 * Восстанавливает класс и добавляет новые поля, если класс был обновлен
 * @param obj - JSON-строка или готовый объект
 * @param base - Класс для восстановления
 * @returns Восстановленный объект с привязкой к классу
 */
export function upgradeClass<T extends object>(
  obj: string | unknown,
  base: Type<T>
): T {
  const source = typeof obj === 'string' ? JSON.parse(obj) : obj;
  return Object.assign(new base(), source);
}
