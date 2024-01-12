import { EnviromentConfiguration } from "../../configurations/enviroment/enviromentConfiguration";
import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { EndlessBackground } from "../endlessBackground/endlessBackground";
import { ParallaxBackground } from "../parallaxBackground/parallaxBackground";

export class EnviromentManager
{
  /**
   * The frounground image of the game.
   */
  private foreground: Phaser.GameObjects.Image;

  /**
   * The parallax background of the game.
   */
  private parallaxBackground: ParallaxBackground;

  /**
   * The endless background of the game.
   */
  private endlessBackground: EndlessBackground;

  public init(
    scene: Phaser.Scene,
    enviromentConfiguration: EnviromentConfiguration,
    gameViewConfiguraiton: GameViewConfiguration
  )
  {
    this.foreground = scene.add.image(
      0,
      0,
      enviromentConfiguration.foregroundLayer
    );

    this.foreground.setOrigin(0, 0);
    this.foreground.setPosition(0, gameViewConfiguraiton.canvasHeight - this.foreground.height);
    this.foreground.setDepth(10);

    this.parallaxBackground = new ParallaxBackground();
    this.parallaxBackground.init(
      scene,
      enviromentConfiguration.parallaxBackgroundLayers,
      gameViewConfiguraiton.canvasHeight
    );

    this.endlessBackground = new EndlessBackground(scene);
    this.endlessBackground.init(
      enviromentConfiguration.endlessBackground,
      gameViewConfiguraiton.canvasHeight
    );
  }

  public update(scrollY: number)
  {
    this.endlessBackground.setY(scrollY);
    this.endlessBackground.update();
  }
}