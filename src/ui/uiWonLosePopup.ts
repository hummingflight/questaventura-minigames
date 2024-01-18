import { IGameManagerListener } from "../objects/gameManager/iGameManagerListener";

export class UiWonLosePopup implements IGameManagerListener
{ 
  private scene: Phaser.Scene;
  private winPopup: Phaser.GameObjects.Image;
  private losePopup: Phaser.GameObjects.Image;

  public init(
    scene: Phaser.Scene,
    uiGroup: Phaser.GameObjects.Container,
    canvasWidth: number,
    canvasHeight: number
  ): void
  {
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
  }

  public onGameWon(): void {
    this.winPopup.setVisible(true);
  }

  public onGameLost(): void {
    this.losePopup.setVisible(true);
  }

  public onLevelWon(): void {
    // Intentionally left blank.
  }

  public onLevelLost(): void {
    // Intentionally left blank.
  }
}