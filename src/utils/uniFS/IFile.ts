import IDirectory from "./IDirectory";

export default interface IFile {
  name: string;
  path: string;
  parent: IDirectory;

  getUrl(): Promise<string>;
  writeAllText(content: string): Promise<void>;
  writeFromFile(file: File): Promise<void>;
  readAllText(): Promise<string>;
  delete(): Promise<void>;
}