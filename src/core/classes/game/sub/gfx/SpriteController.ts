import { AnimationState } from '@/core/types/gfx/AnimationState';
import { AnimationManager } from './AnimationManager';
import { SpriteAnimation } from './SpriteAnimation';

export class SpriteController {
  source: SpriteAnimation;
  state: AnimationState = AnimationState.STOP;
  playbackRate = 1;

  el: HTMLElement | null = null;
  manager: AnimationManager | null = null;
  animation: Animation | null | undefined = null;

  public constructor(source: SpriteAnimation) {
    this.source = source;
  }

  public bindManager(manager: AnimationManager) {
    this.manager = manager;
  }

  public play() {
    if (this.state === AnimationState.PAUSE && this.animation) {
      this.animation.play();
      this.state = AnimationState.PLAY;
      return;
    }

    const spriteAnim: Record<string, string | number>[] = [];
    for (let i = 0; i < this.source.count - 1; i++) {
      spriteAnim.push({
        backgroundPosition: `${100 / this.source.count - 1}% 0`,
        offset: i / this.source.count - 1,
        easing: `steps(${this.source.count} jump-none)`,
      });
    }

    this.state = AnimationState.PLAY;
    this.animation = this.el?.animate(
      this.source.transform.concat(spriteAnim),
      {
        duration: this.source.speed,
        iterations: Infinity,
      }
    );
  }

  public stop() {
    if (this.state !== AnimationState.STOP) {
      this.animation?.cancel();
    }

    this.state === AnimationState.STOP;
  }

  public pause() {
    if (this.state !== AnimationState.PLAY) {
      return;
    }

    this.animation?.pause();
    this.state = AnimationState.PAUSE;
  }
}
