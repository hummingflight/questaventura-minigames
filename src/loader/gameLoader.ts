import { LoaderConfiguration } from "../configurations/loader/loaderConfiguration";

/**
 * Class that loads the game assets into the game according to the given
 * LoaderConfiguration.
 */
export class GameLoader
{

  /**
   * Loads the game assets into the game according to the given
   * LoaderConfiguration.
   *
   * @param loaderConfig The LoaderConfiguration that specifies the assets to
   * load.
   * @param loader The Phaser loader plugin.
   */
  public load(
    loaderConfig: LoaderConfiguration,
    loader: Phaser.Loader.LoaderPlugin
  )
  {
    // Load levels
    loaderConfig.levelsConfig.forEach(levelLoadConfig => {
      loader.text(
        levelLoadConfig.key,
        loaderConfig.assetFolderPath + levelLoadConfig.path
      )
    });

    // Load images
    loaderConfig.images.forEach(imageLoadConfig =>
    { 
      loader.image(
        imageLoadConfig.key,
        loaderConfig.assetFolderPath + imageLoadConfig.path
      );  
    });

    // Load Bitamp Fonts
    loaderConfig.bitmapFonts.forEach(bitmapFontLoadConfig =>
    {
      loader.bitmapFont(
        bitmapFontLoadConfig.key,
        loaderConfig.assetFolderPath + bitmapFontLoadConfig.textureURL,
        loaderConfig.assetFolderPath + bitmapFontLoadConfig.fontDataURL
      );
    });
  }  
}