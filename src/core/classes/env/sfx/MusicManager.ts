export class MusicManager {
  volume: number = 100;
  list: string[] = [];
  musicElement: HTMLAudioElement;

  constructor(musicEl: string) {
    this.musicElement = document.createElement('audio');
  }
}