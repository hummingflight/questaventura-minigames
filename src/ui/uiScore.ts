import { IScoreManagerListener } from "../objects/scoreManager/iScoreManagerListener";

export class UiScore implements IScoreManagerListener
{
  private scoreText: Phaser.GameObjects.BitmapText;

  public init(scene: Phaser.Scene, uiGroup: Phaser.GameObjects.Container, canvasWidth: number): void
  {
    this.scoreText = scene.add.bitmapText(canvasWidth / 2, 100, "font_a", "0", 100);
    uiGroup.add(this.scoreText);
    this.scoreText.setOrigin(0.5, 0.5);
  }

  public onScoreChanged(score: number): void
  {
    this.scoreText.setText(score.toString());
  }

  public onScoreReached(score: number): void
  {
    // Intentionally left empty.
  }
}