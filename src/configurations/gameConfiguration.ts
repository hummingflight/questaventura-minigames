import { EndlessBackgroundConfiguration } from "./endlessBackground/endlessBackgroundConfiguration";
import { GameViewConfiguration } from "./gameViewConfiguration/gameViewConfiguration";
import { LoaderConfiguration } from "./loaderConfiguration";
import { PadsManagerConfiguration } from "./padsManager/padsManagerConfiguration";
import { PlayerConfiguration } from "./player/playerConfiguration";

export class GameConfiguration
{
  /**
   * The main name of the game.
   */
  public gameName: string;

  /**
   * The configuration for the game view.
   */
  public gameView: GameViewConfiguration;
  
  /**
   * Describes the assets to load for this game.
   */
  public loader: LoaderConfiguration;

  /**
   * The configuration of the endless bakcground.
   */
  public endlessBackground: EndlessBackgroundConfiguration;

  /**
   * The configuration of the pads manager.
   */
  public padsManager: PadsManagerConfiguration;

  /**
   * The configuration of the player.
   */
  public player: PlayerConfiguration;
}