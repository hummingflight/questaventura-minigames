import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { IPadsRowGeneratorConfiguration } from "../../configurations/padsManager/IPadsRowGeneratorConfiguration";
import { PadsRowGeneratorDistributedConfiguration } from "../../configurations/padsManager/padsRowGeneratorDistibutedConfiguration";
import { IPadsRowGenerator } from "./IPadsRowGenerator";
import { PadsRowGeneratorDistributed } from "./padsRowGeneratorDistributed";

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
    else
    {
      throw new Error("Unknown pads row generator type: " + configuration.type);
    }
  }
}