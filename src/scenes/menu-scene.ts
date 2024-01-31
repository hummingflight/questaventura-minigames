import { UiSettings } from "../ui/uiSettings";

export class MenuScene extends Phaser.Scene {

  private uiSettings: UiSettings;

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

    // Prepare Settings UI

    const settingsBtn = this.add.sprite(
      864.4,
      37.16,
      "main-menu",
      "settings-settings.png"
    );
    settingsBtn.setOrigin(0, 0);
    settingsBtn.setInteractive();
    settingsBtn.on("pointerdown", this.onSetttingsPressed, this);

    const uiContainer = this.add.container(0, 0);
    this.uiSettings = new UiSettings();
    this.uiSettings.init(this, uiContainer);
    this.uiSettings.close();
  }

  onClickPlay(): void {
    this.scene.start('MainScene');
  }

  onSetttingsPressed(): void {
    this.uiSettings.show();
  }
}