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
    loader.path = loaderConfig.assetFolderPath;

    // Load levels
    loaderConfig.levelsConfig.forEach(levelLoadConfig => {
      loader.text(
        levelLoadConfig.key,
        levelLoadConfig.path
      )
    });

    // Load images
    loaderConfig.images.forEach(imageLoadConfig =>
    { 
      loader.image(
        imageLoadConfig.key,
        imageLoadConfig.path
      );  
    });

    // Load Bitamp Fonts
    loaderConfig.bitmapFonts.forEach(bitmapFontLoadConfig =>
    {
      loader.bitmapFont(
        bitmapFontLoadConfig.key,
        bitmapFontLoadConfig.textureURL,
        bitmapFontLoadConfig.fontDataURL
      );
    });

    // Load Sprie Sheet Animations
    loaderConfig.spriteSheets.forEach(spriteSheetAnimationLoadConfig =>
    {
      loader.spritesheet(
        spriteSheetAnimationLoadConfig.key,
        spriteSheetAnimationLoadConfig.path,
        spriteSheetAnimationLoadConfig.settings
      );
    });

    // Load Audio
    loaderConfig.audio.forEach(audioLoadConfig =>
    {
      loader.audio(audioLoadConfig);
    });
  }  
}