import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { PadsRowGeneratorRandomConfiguration } from "../../configurations/padsManager/padsRowGeneratorRandomConfiguration";
import { IPadsRowGenerator } from "./IPadsRowGenerator";
import { PadsManager } from "./padsManager";

export class PadsRowGeneratorRandom implements IPadsRowGenerator
{
  private config: PadsRowGeneratorRandomConfiguration;  
  private widthRange: number;
  
  public constructor(
    gameViewConfiguration: GameViewConfiguration,
    configuration: PadsRowGeneratorRandomConfiguration
  )
  {
    this.config = configuration;
    this.widthRange = gameViewConfiguration.canvasWidth - this.config.xPadding * 2;
  }
  
  public getWeight(): number
  {
    return this.config.weight;
  }
  
  public generateRow(manager: PadsManager, y: number): void
  {
    const x = this.config.xPadding + Math.random() * this.widthRange;
    const key = this.config.padsKey[Math.floor(Math.random() * this.config.padsKey.length)];
    manager.placePadBykey(x, y, key);
  }
}