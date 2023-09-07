export class BootScene extends Phaser.Scene
{
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.text('game-config', '../assets/configs/forest_game_config.json');    
  }

  create(): void {
    this.scene.start('LoaderScene');
  }
}