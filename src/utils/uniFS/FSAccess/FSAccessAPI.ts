import IBaseFS from "../IBaseFS";
import { FSAccessDirectory } from "./FSAccessDirectory";

export class FSAccessAPI extends FSAccessDirectory implements IBaseFS {

  constructor() {
    super('', '', null, null);
  }

  async init(): Promise<this> {
    const win = (window as GameWindow);
    if (win && win.showDirectoryPicker) {
      this.setHandler(await win.showDirectoryPicker());
      await this.handler.queryPermission({ mode: 'readwrite' });
      return this;
    }
    else {
      throw 'FS Access API not available';
    }
  }

  async setRoot(path: string): Promise<this> {
    this.setHandler(await this.handler.getDirectoryHandle(path));
    return this;
  }

  private setHandler(handler: any): void {
    this.handler = handler;
    this.name = this.handler.name;
    this.path = this.handler.name;
    this.parent = null;
  }
}