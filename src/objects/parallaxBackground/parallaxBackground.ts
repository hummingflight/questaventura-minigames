import { BackgroundLayerConfiguration } from "../../configurations/enviroment/backgroundLayerConfiguration";
import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";

/**
 * Class that represents a parallax background.
 */
export class ParallaxBackground
{
  /**
   * List of layers that compound the parallax background.
   */
  private layers: Array<Phaser.GameObjects.Image>;

  /**
   * Instantiates a new ParallaxBackground.
   */
  public constructor()
  {
    this.layers = new Array<Phaser.GameObjects.Image>();
  }

  /**
   * Initializes the parallax background.
   * 
   * @param scene The scene of the game.
   * @param layers The layers of the parallax background.
   * @param canvasHeight The height of the canvas.
   */
  public init(
    scene: Phaser.Scene,
    layers: Array<BackgroundLayerConfiguration>,
    canvasHeight: number
  )
  {
    // Clear the previous layers.
    this.layers.forEach(layer => layer.destroy());
    this.layers = new Array<Phaser.GameObjects.Image>();

    // Create the new layers.
    layers.forEach(layerConfig =>
    {
      let layer = scene.add.image(0, 0, layerConfig.imageKey);
      layer.setOrigin(0, 0);
      layer.setPosition(0, canvasHeight - layer.height);
      layer.setScrollFactor(layerConfig.depth);
      layer.setDepth(LayersDepthConfiguration.BACKGROUND);

      this.layers.push(layer);
    }, this);
  }
}