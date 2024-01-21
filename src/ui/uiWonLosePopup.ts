import { GameManager } from "../objects/gameManager/gameManager";
import { IGameManagerListener } from "../objects/gameManager/iGameManagerListener";

export class UiWonLosePopup implements IGameManagerListener
{ 
  private scene: Phaser.Scene;
  private winPopup: Phaser.GameObjects.Image;
  private losePopup: Phaser.GameObjects.Image;
  private restartButton: Phaser.GameObjects.Sprite;
  private gameManager: GameManager;

  public init(
    scene: Phaser.Scene,
    uiGroup: Phaser.GameObjects.Container,
    canvasWidth: number,
    canvasHeight: number,
    gameManager: GameManager
  ): void
  {
    this.gameManager = gameManager;

    const hWidth = canvasWidth / 2;
    const hHeight = canvasHeight / 2;

    this.scene = scene;
    this.winPopup = this.scene.add.image(hWidth, hHeight, "winPopup");
    uiGroup.add(this.winPopup);

    this.winPopup.setOrigin(0.5, 0.5);
    this.winPopup.setVisible(false);
    
    this.losePopup = this.scene.add.image(hWidth, hHeight, "losePopup");
    uiGroup.add(this.losePopup);

    this.losePopup.setOrigin(0.5, 0.5);
    this.losePopup.setVisible(false);

    this.restartButton = this.scene.add.sprite(hWidth, hHeight + 200, "ui-btn-restart");
    uiGroup.add(this.restartButton);
    this.restartButton.setInteractive();
    this.restartButton.on("pointerdown", this.onRestartButtonClicked, this);
    this.restartButton.setVisible(false);
  }

  public onGameWon(): void {
    this.winPopup.setVisible(true);
    this.showRestartButton();
  }

  public onGameLost(): void {
    this.losePopup.setVisible(true);
    this.showRestartButton();
  }

  public onLevelWon(): void {
    // Intentionally left blank.
  }

  public onLevelLost(): void {
    // Intentionally left blank.
  }

  private showRestartButton(): void {
    this.restartButton.setVisible(true);
    this.scene.add.tween({
      targets: this.restartButton,
      duration: 1000,
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })
  }

  private onRestartButtonClicked(): void
  {
    this.gameManager.restartGame();
  }
}