import IDirectory from "./IDirectory";

export default interface IBaseFS extends IDirectory {
  init(): Promise<this>;
  setRoot(path: string): Promise<this>;
}