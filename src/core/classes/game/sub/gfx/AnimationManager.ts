import { SpriteController } from "./SpriteController";

export class AnimationManager {
  spriteControllers: SpriteController[] = [];

  public addSpriteController(c: SpriteController) {
    if (!this.spriteControllers.includes(c)) {
      this.spriteControllers.push(c);
      c.bindManager(this);
    }
  }

  public playAll() {
    this.spriteControllers.forEach((c) => c.play());
  }
}
