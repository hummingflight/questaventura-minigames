import { MonsterGeneratorConfiguration } from "./MonsterGeneratorConfiguration";
import { MonstersPoolConfiguraiton } from "./MonstersPoolConfiguration";

export class MonsterManagerConfiguration 
{
  public frequency: number;
  public monstersGenerators: Array<MonsterGeneratorConfiguration>;
  public monstersPool: MonstersPoolConfiguraiton;
}