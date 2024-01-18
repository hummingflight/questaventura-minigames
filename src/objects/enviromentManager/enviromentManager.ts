import { EnviromentConfiguration } from "../../configurations/enviroment/enviromentConfiguration";
import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { EndlessBackground } from "../endlessBackground/endlessBackground";
import { ParallaxBackground } from "../parallaxBackground/parallaxBackground";

/**
 * Manages the enviroment of the game. It is responsible for the background
 * images and endless layers.
 */
export class EnviromentManager
{
  /**
   * The scene of the enviroment manager.
   */
  private scene: Phaser.Scene;

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

  /**
   * Instantiates a new EnviromentManager.
   * 
   * @param scene The scene of the game. 
   */
  public constructor(scene: Phaser.Scene)
  {
    this.scene = scene;
    this.foreground = scene.add.image(0, 0, "");
    this.parallaxBackground = new ParallaxBackground();
    this.endlessBackground = new EndlessBackground(scene);
  }

  /**
   * Prepares the EnviromentManager for a new level.
   * 
   * @param enviromentConfiguration The configuration of the enviroment.
   * @param gameViewConfiguraiton The configuration of the game view.
   */
  public initLevelConfiguration(
    enviromentConfiguration: EnviromentConfiguration,
    gameViewConfiguraiton: GameViewConfiguration
  )
  {
    this.foreground.setTexture(enviromentConfiguration.foregroundLayer);
    this.foreground.setOrigin(0, 0);
    this.foreground.setPosition(0, gameViewConfiguraiton.canvasHeight - this.foreground.height);
    this.foreground.setDepth(10);

    this.parallaxBackground.init(
      this.scene,
      enviromentConfiguration.parallaxBackgroundLayers,
      gameViewConfiguraiton.canvasHeight
    );
    
    this.endlessBackground.init(
      enviromentConfiguration.endlessBackground,
      gameViewConfiguraiton.canvasHeight
    );
  }

  /**
   * Updates this EnviromentManager.
   * 
   * @param scrollY The scrollY of the camera. 
   */
  public update(scrollY: number)
  {
    this.endlessBackground.setY(scrollY);
    this.endlessBackground.update();
  }
}