import IDirectory from '../IDirectory';
import IFile from '../IFile';

export class FSAccessFile implements IFile {
  name: string;
  path: string;
  parent: IDirectory;

  protected handler: any = null;
  public url: Nullable<string> = null;

  constructor(name: string, path: string, parent: IDirectory, handler: any) {
    this.name = name;
    this.path = path;
    this.parent = parent;
    this.handler = handler;
  }

  async getUrl(): Promise<string> {
    return (
      this.url ??
      (this.url = window.URL.createObjectURL(await this.handler.getFile()))
    );
  }

  free(): void {
    if (this.url) window.URL.revokeObjectURL(this.url);
  }

  async writeAllText(content: string): Promise<void> {
    const writer = await this.handler.createWritable();
    writer.write(content);
    writer.close();
  }

  async writeFromFile(file: File): Promise<void> {
    const buffer = await file.arrayBuffer();
    const blob = new Blob([new Uint8Array(buffer)], { type: file.type });
    const writer = await this.handler.createWritable();
    await writer.write(blob);
    await writer.close();
  }

  async readAllText(): Promise<string> {
    return await (await this.handler.getFile()).text();
  }

  async delete(): Promise<void> {
    if (this.url) window.URL.revokeObjectURL(this.url);

    await this.parent.deleteFile(this.name);
  }
}
