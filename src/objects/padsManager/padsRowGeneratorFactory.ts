import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { IPadsRowGeneratorConfiguration } from "../../configurations/padsManager/IPadsRowGeneratorConfiguration";
import { PadsRowGeneratorDistributedConfiguration } from "../../configurations/padsManager/padsRowGeneratorDistibutedConfiguration";
import { PadsRowGeneratorRandomConfiguration } from "../../configurations/padsManager/padsRowGeneratorRandomConfiguration";
import { IPadsRowGenerator } from "./IPadsRowGenerator";
import { PadsRowGeneratorDistributed } from "./padsRowGeneratorDistributed";
import { PadsRowGeneratorRandom } from "./padsRowGeneratorRandom";

export class PadsRowGeneratorFactory
{
  static Create(
    gameViewConfiguration: GameViewConfiguration,
    configuration: IPadsRowGeneratorConfiguration
  ): IPadsRowGenerator
  {
    if (configuration.type === "distributed")
    {
      const generator = new PadsRowGeneratorDistributed(
        gameViewConfiguration,
        configuration as PadsRowGeneratorDistributedConfiguration
      );
      return generator;
    }
    else if (configuration.type === "random")
    {
      const generator = new PadsRowGeneratorRandom(
        gameViewConfiguration,
        configuration as PadsRowGeneratorRandomConfiguration
      );
      return generator;
    }
    else
    {
      throw new Error("Unknown pads row generator type: " + configuration.type);
    }
  }
}