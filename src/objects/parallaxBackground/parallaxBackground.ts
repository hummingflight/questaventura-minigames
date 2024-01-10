import { BackgroundLayerConfiguration } from "../../configurations/enviroment/backgroundLayerConfiguration";

export class ParallaxBackground
{
  private layers: Array<Phaser.GameObjects.Image>;

  public init(
    scene: Phaser.Scene,
    layers: Array<BackgroundLayerConfiguration>,
    canvasHeight: number
  )
  {
    this.layers = new Array<Phaser.GameObjects.Image>();

    layers.forEach(layerConfig =>
    {
      let layer = scene.add.image(0, 0, layerConfig.imageKey);
      layer.setOrigin(0, 0);
      layer.setPosition(0, canvasHeight - layer.height);
      layer.setScrollFactor(layerConfig.depth);

      this.layers.push(layer);
    });
  }
}