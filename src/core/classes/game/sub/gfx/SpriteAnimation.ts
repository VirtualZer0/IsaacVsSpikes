import { SpriteSource } from "@/core/types/gfx/SpriteSource";
import { v4 as uuid } from 'uuid'

export class SpriteAnimation {
  id: string = uuid();
  spritesheet: SpriteSource | null = null;
  count: number = 1;
  frameHeight: number = 64;
  frameWidth: number = 64;
  loop: boolean = true;
  speed: number = 333;
  transform: Record<string, string | number>[] = [];
  baseStyle: Record<string, string | number> = {};
}