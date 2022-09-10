/**
 * Получает категорию файла по его MIME-типу
 * @param mime - MIME-тип файла
 * @returns Категория файла
 */
export function detectFileType(mime: string) {
  if (mime.includes("image")) {
    return "image";
  } else if (mime.includes("audio") || mime.includes("ogg")) {
    return "audio";
  } else if (mime.includes("video")) {
    return "video";
  } else if (mime.includes("font")) {
    return "font";
  } else if (mime.includes("script")) {
    return "script";
  } else if (mime.includes("json")) {
    return "json";
  } else {
    return "other";
  }
}
