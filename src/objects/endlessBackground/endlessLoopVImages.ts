import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";

/**
 * Class that represents a set of images that are displayed in a loop along the
 * Y axis.
 */
export class EndlessLoopVImages extends Phaser.GameObjects.Container
{
  /**
   * List of images that compund the endless loop.
   */
  private _m_imagesContainer: Phaser.GameObjects.Container;

  /**
   * The height of a single image texture.
   */
  private _m_imageHeight: number;

  /**
   * The height of the canvas that this EndlessLoopVImages instance covers.
   */
  private _m_canvasHeight: number;

  /**
   * The number of images that this EndlessLoopVImages instance has.
   */
  private _m_numImages: number;

  /**
   * the depth of the image.
   */
  private _m_depth: number;

  /**
   * Constructor.
   * 
   * @param scene Phaser scene.
   * @param textureKey The key of the endless texture.
   * @param canvasHeight The height of the canvas.
   * @param depth The depth of the endless texture.
   */
  constructor(
    scene: Phaser.Scene,
    textureKey: string,
    canvasHeight: number,
    depth: number
  )
  {
    super(scene, 0, 0);

    this.setDepth(LayersDepthConfiguration.BACKGROUND);
    this._m_depth = depth;
    this._m_canvasHeight = canvasHeight;
    this.initImages(scene, textureKey);
    scene.add.existing(this);
  }

  /**
   * Updates the position of the images according to the position of this
   * EndlessLoopVImages instance.
   */
  public updateImagesPositions()
  {
    this._m_imagesContainer.setY(
      -this._m_imageHeight - ((this.y * (1.0 - this._m_depth)) % this._m_imageHeight)
    );
  }

  /**
   * Initialize the list of the images that compound this EndlessLoopVImages
   * instance.
   * 
   * @param scene Phaser scene.
   * @param textureKey The texture key of the imae.
   */
  private initImages(scene: Phaser.Scene, textureKey: string)
  {
    this._m_imagesContainer = new Phaser.GameObjects.Container(
      scene,
      0, 0
    );
    this.add(this._m_imagesContainer);
    
    // Get the image height
    let texture: Phaser.Textures.Texture = scene.load.textureManager.get(textureKey);
    this._m_imageHeight = texture.getSourceImage().height;

    // Create images
    this._m_numImages = Math.ceil(this._m_canvasHeight / this._m_imageHeight) + 2;
    for (let i: number = 0; i < this._m_numImages; ++i)
    {
      let image = new Phaser.GameObjects.Image(
        scene,
        0, i * this._m_imageHeight,
        textureKey
      );

      image.setDisplayOrigin(0, 0);
      this._m_imagesContainer.add(image);
    }
  }
}