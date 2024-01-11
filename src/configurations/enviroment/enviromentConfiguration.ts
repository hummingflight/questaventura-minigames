import { BackgroundLayerConfiguration } from "./backgroundLayerConfiguration";
import { EndlessBackgroundConfiguration } from "./endlessBackgroundConfiguration";

export class EnviromentConfiguration
{
  public foregroundLayer: string;

  public parallaxBackgroundLayers: Array<BackgroundLayerConfiguration>; 
  
  public endlessBackground: EndlessBackgroundConfiguration;
}