import { LoaderConfiguration } from "../configurations/loader/loaderConfiguration";

export class GameLoader
{
  public load(
    loaderConfig: LoaderConfiguration,
    loader: Phaser.Loader.LoaderPlugin
  )
  {
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