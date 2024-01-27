import { EnviromentConfiguration } from "./enviroment/enviromentConfiguration";
import { MonsterManagerConfiguration } from "./monstersManager/MonsterManagerConfiguration";
import { PadsManagerConfiguration } from "./padsManager/padsManagerConfiguration";
import { PlayerConfiguration } from "./player/playerConfiguration";
import { ScoreManagerConfiguration } from "./scoreManager/scoreManagerConfiguration";

export class LevelConfiguration
{
  /**
   * The name of the level.
   */
  public levelName: string;

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
   * The configuration of the monsters manager.
   */
  public monstersManager: MonsterManagerConfiguration;
}