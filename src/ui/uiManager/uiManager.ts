import { GameManager } from "../../objects/gameManager/gameManager";
import { UiScore } from "../uiScore";
import { UiWonLosePopup } from "../uiWonLosePopup";

export class UiManager
{
  private container: Phaser.GameObjects.Container;
  private uiWonLosePopup: UiWonLosePopup;
  private uiScore: UiScore;
  private gameManager: GameManager;

  public init(
    scene: Phaser.Scene,
    canvasWidth: number,
    canvasHeight: number,
    gameManager: GameManager
  ): void
  {
    this.gameManager = gameManager;
    this.container = scene.add.container();
    this.container.setDepth(1000);

    // Setup objects
    this.uiWonLosePopup = new UiWonLosePopup();
    this.uiWonLosePopup.init(scene, this.container, canvasWidth, canvasHeight);

    this.uiScore = new UiScore();
    this.uiScore.init(scene, this.container, canvasWidth);

    // Setup listeners
    gameManager.addListener(this.uiWonLosePopup);
    gameManager.getScoreManager().addListener(this.uiScore);
  }

  public update(): void
  {
    this.container.setY(this.gameManager.getCameraY());
  }
}