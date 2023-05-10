import IDirectory from '../IDirectory';
import IFile from '../IFile';
import { FSAccessFile } from './FSAccessFile';

export class FSAccessDirectory implements IDirectory {
  name: string;
  path: string;
  parent: Nullable<IDirectory>;

  protected handler: any;

  constructor(
    name: string,
    path: string,
    parent: Nullable<IDirectory>,
    handler: any
  ) {
    this.name = name;
    this.path = path;
    this.parent = parent;
    this.handler = handler;
  }

  async getFiles(): Promise<IFile[]> {
    const res = [];

    for await (const handle of this.handler.values()) {
      res.push(handle);
    }

    return res
      .filter((e: any) => e.kind == 'file')
      .map(
        (e: any) => new FSAccessFile(e.name, `${this.path}/${e.name}`, this, e)
      );
  }

  async getFile(name: string): Promise<IFile> {
    return new FSAccessFile(
      name,
      `${this.path}/${name}`,
      this,
      await this.handler.getFileHandle(name)
    );
  }

  async getDirectories(): Promise<IDirectory[]> {
    const res = [];

    for await (const handle of this.handler.values()) {
      res.push(handle);
    }

    return res
      .filter((e: any) => e.kind == 'directory')
      .map(
        (e: any) =>
          new FSAccessDirectory(e.name, `${this.path}/${e.name}`, this, e)
      );
  }

  async getDirectory(name: string): Promise<IDirectory> {
    return new FSAccessDirectory(
      name,
      `${this.path}/${name}`,
      this,
      await this.handler.getDirectoryHandle(name)
    );
  }

  async createFile(name: string): Promise<IFile> {
    const fhandler = await this.handler.getFileHandle(name, { create: true });
    return new FSAccessFile(name, `${this.path}/${name}`, this, fhandler);
  }

  async deleteFile(name: string): Promise<void> {
    return await this.handler.removeEntry(name);
  }

  async createDirectory(name: string): Promise<IDirectory> {
    const dhandler = await this.handler.getDirectoryHandle(name, {
      create: true,
    });
    return new FSAccessDirectory(name, `${this.path}/${name}`, this, dhandler);
  }

  async deleteDirectory(name: string): Promise<void> {
    return await this.handler.removeEntry(name, { recursive: true });
  }

  async delete(): Promise<void> {
    if (this.parent) return await this.parent.deleteDirectory(this.name);
    else throw new Error('Cannot delete root directory');
  }

  async rename(name: string): Promise<void> {
    if (!this.handler.move) {
      throw new Error(
        'Current browser does not suppor Move method. Try to enable it in chrome://flags/#enable-experimental-web-platform-features'
      );
    }
    return await this.handler.move(name);
  }
}
