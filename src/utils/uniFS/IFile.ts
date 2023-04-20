import IDirectory from './IDirectory';

export default interface IFile {
  url?: any;
  name: string;
  path: string;
  parent: IDirectory;

  /** Получить URL-файла */
  getUrl(): Promise<string>;

  /** Записать текст в файл */
  writeAllText(content: string): Promise<void>;

  /** Записать данные из браузера в файл */
  writeFromFile(file: File): Promise<void>;

  /** Прочитать текст из файла */
  readAllText(): Promise<string>;

  /** Удалить файл */
  delete(): Promise<void>;

  /** Освободить занятые файлом ресурсы */
  free(): void;
}
