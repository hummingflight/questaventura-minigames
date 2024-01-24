import { IPadsRowGeneratorConfiguration } from "./IPadsRowGeneratorConfiguration";
import { PadConfiguration } from "./padConfiguration";

/**
* The pads manager configuration.
*/
export class PadsManagerConfiguration
{
  /**
   * The vertical space between the pads.
   */
  public inBetweenVSpace: number;

  /**
   * The pads of the game.
   */
  public pads: Array<PadConfiguration>;

  /**
   * The safe pads row generator of the game.
   */
  public safePadsRowGenerator: IPadsRowGeneratorConfiguration;

  /**
   * The pads row generators of the game.
   */
  public padsRowGenerators: Array<IPadsRowGeneratorConfiguration>;
}