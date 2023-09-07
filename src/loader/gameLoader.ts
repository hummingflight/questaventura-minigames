import { LoaderConfiguration } from "../configurations/loaderConfiguration";

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
  }  
}