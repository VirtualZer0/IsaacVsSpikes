/** Управляет состоянием всех отрисовываемых в данный момент спрайтов */
export class SpriteManager {
  /** Массив с коллбэками для активных спрайтов */
  private renderCallbacks: { (delta: DOMHighResTimeStamp): void }[] = [];

  /** Максимальное значение FPS (FPS Lock) */
  private maxFPS = 60;

  /** Интервал между кадрами */
  private frameInterval: number = 1000 / this.maxFPS;

  /** Время последнего вызова RAF */
  private lastRAF: number = new Date().getTime();

  /** Статус проигрывания анимации спрайтов */
  private pause = false;

  /** Добавляет спрайт в массив активных спрайтов */
  addSprite(callback: (delta: number) => void): void {
    this.renderCallbacks.push(callback);
  }

  /** Удаялет спрайт из массива активных спрайтов */
  removeSprite(callback: (delta: number) => void): void {
    const index = this.renderCallbacks.indexOf(callback);
    this.renderCallbacks.splice(index, 1);
  }

  /** Метод для вызова из requestAnimationFrame */
  requestAnimationFrame() {
    if (this.pause) {
      requestAnimationFrame(this.requestAnimationFrame.bind(this));
      return;
    }

    const now = new Date().getTime();
    const time = now - this.lastRAF;

    if (time > this.frameInterval) {
      this.lastRAF = now;

      let i = 0;
      const l = this.renderCallbacks.length;

      while (i < l) {
        this.renderCallbacks[i](now);
        ++i;
      }
    }
    requestAnimationFrame(this.requestAnimationFrame.bind(this));
  }

  /** Запускает анимацию всех спрайтов */
  start() {
    this.pause = false;
    this.requestAnimationFrame();
  }

  /** Останавливает анимацию всех спрайтов */
  stop() {
    this.pause = true;
  }

  /**
   * Устанавливает максимальное значение FPS
   * @param FPS - Максимальное значение FPS
   */
  setMaxFPS(FPS = 60) {
    this.maxFPS = FPS;
    this.frameInterval = 1000 / FPS;
  }
}
