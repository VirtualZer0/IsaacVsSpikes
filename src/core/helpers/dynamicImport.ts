/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Динамический импорт всех файлов из папки на этапе компиляции
 * @param imports - Функция запроса модулей
 * @returns Массив импортированных модулей
 */
export function dynamicImport(imports: any): unknown[] {
  const arr: unknown[] = [];

  imports.keys().forEach((key: string) => {
    arr.push(imports(key).default);
  })

  return arr;
}

/**
 * Динамический импорт всех файлов из папки на этапе компиляции с получением id
 * @param imports - Функция запроса модулей
 * @returns Словарь импортированных модулей
 */
export function dynamicImportUsingId(imports: any): Map<number,unknown> {
  const arr: Map<number, unknown> = new Map();

  imports.keys().forEach((key: string) => {
    const item = imports(key).default;
    arr.set(item.id, item);
  });

  return arr;
}