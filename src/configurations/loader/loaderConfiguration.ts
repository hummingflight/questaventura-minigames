import { AudioLoadConfiguration } from "./audioLoadConfiguraiton";
import { BitmapFontLoadConfiguration } from "./bitmapFontLoadConfiguration";
import { ImageLoadConfiguration } from "./imageLoadConfiguration";
import { LevelConfigLoadConfiguration } from "./levelLoadConfiguration";
import { SpriteSheetLoadConfiguration } from "./spriteSheetLoadConfiguration";

export class LoaderConfiguration 
{
  /**
   * The path of the asset folder relative to the game bundle.
   */
  public assetFolderPath: string;

  /**
   * List of levels to load.
   */
  public levelsConfig: Array<LevelConfigLoadConfiguration>;

  /**
   * List of images to load.
   */
  public images: Array<ImageLoadConfiguration>;

  /**
   * List of bitmap fonts to load.
   */
  public bitmapFonts: Array<BitmapFontLoadConfiguration>;

  /**
   * List of audio to load.
   */
  public audio: Array<AudioLoadConfiguration>;

  /**
   * List of sprite sheets to load.
   */
  public spriteSheets: Array<SpriteSheetLoadConfiguration>;
}