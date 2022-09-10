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
  addSprite(callback: (delta: DOMHighResTimeStamp) => void): void {
    this.renderCallbacks.push(callback);
  }

  /** Удаялет спрайт из массива активных спрайтов */
  removeSprite(callback: (delta: DOMHighResTimeStamp) => void): void {
    const index = this.renderCallbacks.indexOf(callback);
    this.renderCallbacks.splice(index, 1);
  }

  /** Метод для вызова из requestAnimationFrame */
  requestAnimationFrame(delta: DOMHighResTimeStamp) {
    if (this.pause) return;
    requestAnimationFrame(this.requestAnimationFrame);

    const now = new Date().getTime();
    const time = now - this.lastRAF;

    if (time <= this.frameInterval) return;

    this.lastRAF = now - (delta % this.lastRAF);

    let i = 0;
    const l = this.renderCallbacks.length;

    while (i < l) {
      this.renderCallbacks[i](delta);
      ++i;
    }
  }

  /** Запускает анимацию всех спрайтов */
  start() {
    this.pause = false;
    this.requestAnimationFrame(0);
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
