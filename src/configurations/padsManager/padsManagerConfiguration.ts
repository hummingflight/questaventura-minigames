import { PadChanceConfiguration } from "./padChanceConfiguration";
import { PadConfiguration } from "./padConfiguration";
import { PadsRowConfiguration } from "./padsRowConfiguration";

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
   * Indicates the key of a safe pad. Used to fill the first row of the game.
   */
  public safePad: String;

  /**
   * The pads chance of the game.
   */
  public padsChance: Array<PadChanceConfiguration>;

  /**
   * The pads rows of the game.
   */
  public padsRows: Array<PadsRowConfiguration>;
}