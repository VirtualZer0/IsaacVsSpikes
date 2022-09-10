export class MusicManager {
  volume = 100;
  list: string[] = [];
  musicElement: HTMLAudioElement;

  constructor(musicEl: string) {
    this.musicElement = document.createElement("audio");
  }
}
