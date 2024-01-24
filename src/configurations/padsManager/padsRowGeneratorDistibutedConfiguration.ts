import { IPadsRowGeneratorConfiguration } from "./IPadsRowGeneratorConfiguration";

export class PadsRowGeneratorDistributedConfiguration implements IPadsRowGeneratorConfiguration
{
  public type: string;

  public weight: number;

  public randomPadsArrange: boolean;

  public padsKey: string[];
}