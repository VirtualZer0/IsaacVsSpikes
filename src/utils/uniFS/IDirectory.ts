import IFile from "./IFile";

export default interface IDirectory {
  name: string;
  path: string;
  parent: Nullable<IDirectory>;

  getFiles(): Promise<IFile[]>;
  getFile(name: string): Promise<IFile>;
  getDirectories(): Promise<IDirectory[]>;
  getDirectory(name: string): Promise<IDirectory>;
  createFile(name: string): Promise<IFile>;
  deleteFile(name: string): Promise<void>;
  createDirectory(name: string): Promise<IDirectory>;
  deleteDirectory(name: string): Promise<void>;
  delete(): Promise<void>;
}
