import { EndlessBackgroundConfiguration } from "./endlessBackground/endlessBackgroundConfiguration";
import { LoaderConfiguration } from "./loaderConfiguration";

export class GameConfiguration
{
  /**
   * The main name of the game.
   */
  public gameName: string;

  /**
   * Describes the assets to load for this game.
   */
  public loader: LoaderConfiguration;

  /**
   * The configuration of the endless bakcground.
   */
  public endlessBackground: EndlessBackgroundConfiguration;
}