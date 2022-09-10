import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { v4 as uuid } from "uuid";

export class SpriteAnimation {
  id: string = uuid();
  spritesheet: SpriteSource | null = null;
  count = 1;
  frameHeight = 64;
  frameWidth = 64;
  loop = true;
  speed = 333;
  transform: Record<string, string | number>[] = [];
  baseStyle: Record<string, string | number> = {};
}
