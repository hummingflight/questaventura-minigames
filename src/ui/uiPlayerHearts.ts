import { IPlayerHeartsListener } from "../objects/player/iPlayerHeartsListener";

export class UiPlayerHearts implements IPlayerHeartsListener
{ 
  private heartsText: Phaser.GameObjects.Text;

  onLoseHeart(hearts: number): void {
    this.heartsText.text = "Hearts: " + hearts.toString();
  }

  onGetHeart(hearts: number): void {
    this.heartsText.text = "Hearts: " + hearts.toString();
  }

  public init(
    scene: Phaser.Scene,
    uiGroup: Phaser.GameObjects.Container,
    initialHearts: number
  ): void
  {
    this.heartsText = scene.add.text(
      10,
      50,
      "Hearts: " + initialHearts.toString(),
      { fontFamily: 'Arial', color: '#ff0000' }
    );
    this.heartsText.setFontSize(40);

    uiGroup.add(this.heartsText);
    this.heartsText.setOrigin(0, 0.5);
  }
}