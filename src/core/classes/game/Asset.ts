import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import IBaseFS from "@/utils/uniFS/IBaseFS";
import IFile from "@/utils/uniFS/IFile";
import { Resource } from "../base/Resource";

import { v4 as uuid } from 'uuid'
import { detectFileType } from "@/core/helpers/detectFileType";
import { ResourceFilter } from "../base/ResourceFilter";
import IDirectory from "@/utils/uniFS/IDirectory";

export class Asset extends Resource {
  type: 'image' | 'audio' | 'video' | 'font' | 'script' | 'json' | 'other' = 'other';
  filename: string = '';
  extension: string = '';
  file?: Nullable<IFile> = null;

  getPreview(): Nullable<SpriteSource> {
    throw new Error("Method not implemented.");
  }


  public static async create(file: File, fs: IBaseFS): Promise<Asset> {
    const assetsDir = await fs.getDirectory('assets');

    const asset = new Asset();
    asset.id = uuid();
    asset.filename = file.name;
    asset.extension = file.name.split('.').pop() || '';
    asset.type = detectFileType(file.type);

    const targetDir = await assetsDir.getDirectory(asset.type);
    const newFile = await targetDir.createFile(`${asset.id}.${asset.extension}`);
    await newFile.writeFromFile(file);

    asset.file = newFile;

    return asset;
  }

  public async  getFile(assetDir: IDirectory): Promise<Nullable<IFile>> {
    if (this.file) {
      return this.file;
    }

    const dir = await assetDir.getDirectory(this.type);
    return await dir.getFile(`${this.id}.${this.extension}`);
  }

  public getDisplayName(locale = 'ru'): string {

    if (this.name[locale]) {
      return this.name[locale];
    }
    else if (Object.values(this.name).length > 0) {
      return Object.values(this.name)[0];
    }

    return this.filename;
  }

  public isMatch(search: string): boolean {

    if (this.filename.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }

    return super.isMatch(search);
  }

  getFilters(): ResourceFilter[] {
    return [
      {name: 'type', values: ['image', 'audio', 'video', 'font', 'script', 'json', 'other']},
    ]
  }

  isMatchFilter(filter: string, value: string): boolean {

    if (filter === 'type') {
      return this.type === value;
    }

    return false;

  }


}