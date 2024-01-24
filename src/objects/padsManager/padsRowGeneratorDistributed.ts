import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { PadsRowGeneratorDistributedConfiguration } from "../../configurations/padsManager/padsRowGeneratorDistibutedConfiguration";
import { IPadsRowGenerator } from "./IPadsRowGenerator";
import { PadsManager } from "./padsManager";

export class PadsRowGeneratorDistributed implements IPadsRowGenerator
{
  private config: PadsRowGeneratorDistributedConfiguration;  
  private inBetweenPadsDistance: number;
  
  public constructor(
    gameViewConfiguration: GameViewConfiguration,
    configuration: PadsRowGeneratorDistributedConfiguration
  )
  {
    this.config = configuration;
    this.inBetweenPadsDistance = gameViewConfiguration.canvasWidth / (configuration.padsKey.length + 1);
  }

  public getWeight(): number {
    return this.config.weight;
  }

  public generateRow(manager: PadsManager, y: number): void {
    let x = this.inBetweenPadsDistance;

    if (this.config.randomPadsArrange)
      this.generateRowRandom(manager, y);
    else
      this.generateRowOrdered(manager, y);
  }

  public generateRowRandom(manager: PadsManager, y: number): void {
    let x = this.inBetweenPadsDistance;
    let randomPadsKey = this.config.padsKey.slice();
    Phaser.Utils.Array.Shuffle(randomPadsKey);
    for (let i = 0; i < randomPadsKey.length; i++)
    {
      manager.placePadBykey(x, y, randomPadsKey[i]);
      x += this.inBetweenPadsDistance;
    }
  }

  public generateRowOrdered(manager: PadsManager, y: number): void {
    let x = this.inBetweenPadsDistance;
    for (let i = 0; i < this.config.padsKey.length; i++)
    {
      manager.placePadBykey(x, y, this.config.padsKey[i]);
      x += this.inBetweenPadsDistance;
    }
  }  
}