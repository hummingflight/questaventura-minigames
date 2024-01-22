import { AudioManagerConfiguration } from "./audioManagerConfiguration/audioManagerConfiguration";
import { EffectsManagerConfiguration } from "./effectsConfiguration/effectsManagerConfiguration";
import { GameEffectsConfiguration } from "./gameEffectsConfiguration/gameEffectsConfiguration";
import { GameViewConfiguration } from "./gameViewConfiguration/gameViewConfiguration";
import { LoaderConfiguration } from "./loader/loaderConfiguration";

export class GameConfiguration
{
  /**
   * The main name of the game.
   */
  public gameName: string;

  /**
   * The initial number of lifes of the player.
   */
  public playerInitialLifes: number;

  /**
   * Indicates the index of the initial level.
   */
  public initialLevelIdx: number;

  /**
   * The levels of the game.
   */
  public levels: string[];

  /**
   * The configuration for the game view.
   */
  public gameView: GameViewConfiguration;
  
  /**
   * Describes the assets to load for this game.
   */
  public loader: LoaderConfiguration; 

  /**
   * The configuration of the game effects.
   */
  public gameEffects: GameEffectsConfiguration;

  /**
   * The configuration of the audio manager.
   */
  public audio: AudioManagerConfiguration;

  /**
   * The configuration of the animations.
   */
  public animations: Array<object>;

  /**
   * The configuration of the effects.
   */
  public effects: EffectsManagerConfiguration;
}