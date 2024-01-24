import { IPadsRowGeneratorConfiguration } from "./IPadsRowGeneratorConfiguration";

export class PadsRowGeneratorRandomConfiguration implements IPadsRowGeneratorConfiguration
{
  public type: string;

  public weight: number;

  public xPadding: number;

  public padsKey: string[];
}