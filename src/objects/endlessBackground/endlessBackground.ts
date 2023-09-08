import { EndlessBackgroundConfiguration } from "../../configurations/endlessBackground/endlessBackgroundConfiguration";
import { EndlessLoopVImages } from "./endlessLoopVImages";

export class EndlessBackground extends Phaser.GameObjects.Group
{
  private endlessImages: Array<EndlessLoopVImages>;

  public init(
    configuration: EndlessBackgroundConfiguration,
    canvasHeight: number
  )
  {
    this.clear(true, true);
    this.endlessImages = new Array<EndlessLoopVImages>();

    configuration.layers.forEach(layerConfig =>
    {
      let endlessLoopImage = new EndlessLoopVImages(
        this.scene,
        layerConfig.imageKey,
        canvasHeight,
        layerConfig.depth
      );
      
      this.add(endlessLoopImage);
      this.endlessImages.push(endlessLoopImage);
    });
  }

  public update()
  {
    this.endlessImages.forEach(endlessLoopImage =>
    {
      endlessLoopImage.updateImagesPositions();
    });
  }
}