import { IScoreManagerListener } from "../objects/scoreManager/iScoreManagerListener";

export class UiScore implements IScoreManagerListener
{
  private readonly SCORE_Y: number = 140;

  private scoreText: Phaser.GameObjects.BitmapText;

  public init(scene: Phaser.Scene, uiGroup: Phaser.GameObjects.Container, canvasWidth: number): void
  {
    let woodPanel = scene.add.image(0, 0, "wood_panel");
    woodPanel.setOrigin(0, 0);
    uiGroup.add(woodPanel);

    this.scoreText = scene.add.bitmapText(
      canvasWidth / 2,
      this.SCORE_Y,
      "font_a",
      "0",
      120
    );

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