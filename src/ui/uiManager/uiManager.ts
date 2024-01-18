import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { GameManager } from "../../objects/gameManager/gameManager";
import { UiPlayerHearts } from "../uiPlayerHearts";
import { UiPlayerLives } from "../uiPlayerLives";
import { UiScore } from "../uiScore";
import { UiWonLosePopup } from "../uiWonLosePopup";

export class UiManager
{
  private container: Phaser.GameObjects.Container;
  private uiWonLosePopup: UiWonLosePopup;
  private uiScore: UiScore;
  private uiPlayerLives: UiPlayerLives;
  private uiPalyerHearts: UiPlayerHearts;
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
    this.container.setDepth(LayersDepthConfiguration.UI);

    // Setup UI elements
    this.uiWonLosePopup = new UiWonLosePopup();
    this.uiWonLosePopup.init(scene, this.container, canvasWidth, canvasHeight);

    this.uiScore = new UiScore();
    this.uiScore.init(scene, this.container, canvasWidth);

    this.uiPalyerHearts = new UiPlayerHearts();
    this.uiPalyerHearts.init(
      scene,
      this.container,
      gameManager.getPlayer().getHearts().getNumHearts()
    );

    this.uiPlayerLives = new UiPlayerLives();
    this.uiPlayerLives.init(
      scene,
      this.container,
      gameManager.getPlayer().getLives().getLives()
    );

    // Setup listeners
    gameManager.addListener(this.uiWonLosePopup);
    gameManager.getScoreManager().addListener(this.uiScore);
    gameManager.getPlayer().getLives().addListener(this.uiPlayerLives);
    gameManager.getPlayer().getHearts().addListener(this.uiPalyerHearts);
  }

  public update(): void
  {
    this.container.setY(this.gameManager.getCameraY());
  }
}