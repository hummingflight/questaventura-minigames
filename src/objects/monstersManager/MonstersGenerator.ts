import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { MonsterGeneratorConfiguration } from "../../configurations/monstersManager/MonsterGeneratorConfiguration";
import { MonstersPool } from "./MonstersPool";

export class MonstersGenerator
{
  private configuration: MonsterGeneratorConfiguration;
  private gameViewConfiguration: GameViewConfiguration;
  private monstersPool: MonstersPool;

  public GetWeight(): number {
    return this.configuration.weight;
  }

  public init(
    configuration: MonsterGeneratorConfiguration,
    gameViewConfiguration: GameViewConfiguration,
    monstersPool: MonstersPool
  ): void {
    this.configuration = configuration;
    this.gameViewConfiguration = gameViewConfiguration;
    this.monstersPool = monstersPool;
  }

  public generate(y: number): void
  {
    const monster = this.monstersPool.getMonster(this.configuration.monstersKey[0]);
    monster.body.reset(500, y);
    monster.start();
  }
}