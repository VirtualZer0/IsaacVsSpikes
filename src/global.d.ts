type Nullable<T> = T | null;

/**
 * Позволяет обращаться к объекту через object[property] вместо object.property.
 * Необходимо, когда property берется из значения переменной
 * @see /store/editor.ts:loadProject()
 */
type Indexable<T> = {
  [key: string]: T;
}

/**
 * Расширенный тип для window, добавляющий методы, которые существуют,
 * но не указаны в дефолтном типе для window
 */
type GameWindow = Window & typeof globalThis & {core: Core} & {
  showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
};