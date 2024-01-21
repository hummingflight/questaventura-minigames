export class MenuScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    let bg = this.add.image(0, 0, 'menu-bg');
    bg.setOrigin(0, 0);
    
    let btnPlay = this.add.sprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 + 250,
      'menu-btn-start'
    ).setInteractive();
    btnPlay.on('pointerdown', this.onClickPlay, this);

    this.add.tween({
      targets: btnPlay,
      duration: 1500,
      y: btnPlay.y - 20,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })
  }

  onClickPlay(): void {
    this.scene.start('MainScene');
  }
}