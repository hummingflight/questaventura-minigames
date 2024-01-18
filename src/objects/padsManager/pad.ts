import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { PadConfiguration } from "../../configurations/padsManager/padConfiguration";

/**
 * Class that represents a pad of the game.
 */
export class Pad extends Phaser.Physics.Arcade.Sprite
{
  /**
   * The current pad configuration.
   */
  private padConfiguration: PadConfiguration;

/**
   * The current pad configuration.
   */
  public getPadConfiguration(): PadConfiguration
  {
    return this.padConfiguration;
  }

  /**
   * Instantiates a new Pad.
   * 
   * @param scene The scene of the game.
   * @param x The x position of the pad.
   * @param y The y position of the pad.
   * @param texture The texture of the pad.
   */
  public constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string
  )
  {
    super(scene, x, y, texture);
    this.setDepth(LayersDepthConfiguration.PADS);
  }

  /**
   * Initialize this pad with the given configuration.
   * 
   * @param padConfiguration The configuration of this pad.
   */
  public init(padConfiguration: PadConfiguration): void
  {
    this.padConfiguration = padConfiguration;

    this.setTexture(padConfiguration.imageKey);
    this.setOrigin(0.5, 0);
    this.setScale(
      padConfiguration.scaleX,
      padConfiguration.scaleY
    );

    this.body.checkCollision.down = false;
    this.refreshBody();
  }

  /**
   * Checks if this pad is out of bounds.
   * 
   * @param currentViewTopValue The current top value of the view.
   * @param canvasHeight The height of the canvas.
   * 
   * @returns True if this pad is out of bounds, false otherwise.
   */
  public isOutOfBounds(
    currentViewTopValue: number,
    canvasHeight: number
  ): boolean
  {
    return this.y > (currentViewTopValue + canvasHeight);
  }
}