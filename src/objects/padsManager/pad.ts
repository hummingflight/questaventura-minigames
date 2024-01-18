import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { PadConfiguration } from "../../configurations/padsManager/padConfiguration";

export class Pad extends Phaser.Physics.Arcade.Sprite
{
  /**
   * The current pad configuration.
   */
  private padConfiguration: PadConfiguration;

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
   * The current pad configuration.
   */
  public getPadConfiguration(): PadConfiguration
  {
    return this.padConfiguration;
  }

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

  public isOutOfBounds(
    currentViewTopValue: number,
    canvasHeight: number
  ): boolean
  {
    return this.y > (currentViewTopValue + canvasHeight);
  }
}