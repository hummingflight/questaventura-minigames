import { EnviromentConfiguration } from "./enviroment/enviromentConfiguration";
import { GameEffectsConfiguration } from "./gameEffectsConfiguration/gameEffectsConfiguration";
import { GameViewConfiguration } from "./gameViewConfiguration/gameViewConfiguration";
import { LoaderConfiguration } from "./loader/loaderConfiguration";
import { PadsManagerConfiguration } from "./padsManager/padsManagerConfiguration";
import { PlayerConfiguration } from "./player/playerConfiguration";
import { ScoreManagerConfiguration } from "./scoreManager/scoreManagerConfiguration";

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
   * The configuration of the game enviroment.
   */
  public enviroment: EnviromentConfiguration;

  /**
   * The configuration of the pads manager.
   */
  public padsManager: PadsManagerConfiguration;

  /**
   * The configuration of the player.
   */
  public player: PlayerConfiguration;

  /**
   * The configuration of the score manager.
   */
  public scoreManager: ScoreManagerConfiguration

  /**
   * The configuration of the game effects.
   */
  public gameEffects: GameEffectsConfiguration;
}