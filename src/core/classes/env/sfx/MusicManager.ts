export class MusicManager {
  volume = 100;
  list: string[] = [];
  musicElement: HTMLAudioElement;

  constructor(musicEl: string) {
    this.musicElement = document.createElement('audio');
    this.musicElement.src = '/assets/sfx/music/Title.mp3';
    this.musicElement.volume = 0.1;
  }
}
