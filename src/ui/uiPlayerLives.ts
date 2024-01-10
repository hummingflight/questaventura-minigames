import { IPlayerLivesListener } from "../objects/player/iPlayerLivesListener";

export class UiPlayerLives implements IPlayerLivesListener
{ 
  private livesText: Phaser.GameObjects.Text;

  onLoseLife(lives: number): void {
    this.livesText.text = "Lives: " + lives.toString();
  }

  onGetLife(lives: number): void {
    this.livesText.text = "Lives: " + lives.toString();
  }

  public init(
    scene: Phaser.Scene,
    uiGroup: Phaser.GameObjects.Container,
    initialLives: number
  ): void
  {
    this.livesText = scene.add.text(
      10,
      100,
      "Lives: " + initialLives.toString(),
      { fontFamily: 'Arial', color: '#00ff00' }
    );
    this.livesText.setFontSize(40);

    uiGroup.add(this.livesText);
    this.livesText.setOrigin(0, 0.5);
  }
}