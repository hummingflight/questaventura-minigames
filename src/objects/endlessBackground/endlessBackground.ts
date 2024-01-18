import { EndlessBackgroundConfiguration } from "../../configurations/enviroment/endlessBackgroundConfiguration";
import { EndlessLoopVImages } from "./endlessLoopVImages";

/**
 * Class that manages endless layers along the Y axis.
 */
export class EndlessBackground extends Phaser.GameObjects.Group
{
  /**
   * List of endless layers.
   */
  private endlessLayers: Array<EndlessLoopVImages>;

  /**
   * Initializes the EndlessBackground instance.
   * 
   * @param configuration The configuration of the endless background.
   * @param canvasHeight The height of the canvas.
   */
  public init(
    configuration: EndlessBackgroundConfiguration,
    canvasHeight: number
  )
  {
    this.clear(true, true);
    this.endlessLayers = new Array<EndlessLoopVImages>();

    configuration.layers.forEach(layerConfig =>
    {
      let endlessLoopImage = new EndlessLoopVImages(
        this.scene,
        layerConfig.imageKey,
        canvasHeight,
        layerConfig.depth
      );
      
      this.add(endlessLoopImage);
      this.endlessLayers.push(endlessLoopImage);
    });
  }

  /**
   * Updates the position of the endless layers.
   */
  public update()
  {
    this.endlessLayers.forEach(endlessLoopImage =>
    {
      endlessLoopImage.updateImagesPositions();
    });
  }
}