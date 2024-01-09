import { BitmapFontLoadConfiguration } from "./bitmapFontLoadConfiguration";
import { ImageLoadConfiguration } from "./imageLoadConfiguration";

export class LoaderConfiguration 
{
  /**
   * The path of the asset folder relative to the game bundle.
   */
  public assetFolderPath: string;

  /**
   * List of images to load.
   */
  public images: Array<ImageLoadConfiguration>;

  /**
   * List of bitmap fonts to load.
   */
  public bitmapFonts: Array<BitmapFontLoadConfiguration>;
}