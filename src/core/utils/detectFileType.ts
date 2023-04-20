import { AssetType } from '../types/game/AssetType';

/**
 * Получает категорию файла по его MIME-типу
 * @param mime - MIME-тип файла
 * @returns Категория файла
 */
export function detectFileType(mime: string): AssetType {
  if (mime.includes('image')) {
    return AssetType.GFX;
  } else if (mime.includes('audio') || mime.includes('ogg')) {
    return AssetType.SFX;
  } else if (mime.includes('video')) {
    return AssetType.VIDEO;
  } else if (mime.includes('font')) {
    return AssetType.FONT;
  } else if (mime.includes('script')) {
    return AssetType.SCRIPT;
  } else if (mime.includes('json')) {
    return AssetType.JSON;
  } else {
    return AssetType.OTHER;
  }
}
