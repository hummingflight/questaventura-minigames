import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { MonsterGeneratorConfiguration } from "../../configurations/monstersManager/MonsterGeneratorConfiguration";
import { MonstersPool } from "./MonstersPool";

export class MonstersGenerator
{
  private configuration: MonsterGeneratorConfiguration;
  private gameViewConfiguration: GameViewConfiguration;
  private monstersPool: MonstersPool;
  private randomRangePadding: number = 200;

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
    if (this.configuration.spawnStrategy === "middle")
      this.generateMiddle(y);
    else if (this.configuration.spawnStrategy === "random")
      this.generateRandom(y);
    else
      throw new Error("Invalid spawn strategy");
  }

  private generateMiddle(y: number): void
  {
    const monsterKey = this.configuration.monstersKey[
      Math.floor(Math.random() * this.configuration.monstersKey.length)
    ];
    
    const monster = this.monstersPool.getMonster(monsterKey);
    monster.body.reset(500, y);
    monster.start();
  }

  private generateRandom(y: number): void
  {
    const monsterKey = this.configuration.monstersKey[
      Math.floor(Math.random() * this.configuration.monstersKey.length)
    ];

    const monster = this.monstersPool.getMonster(monsterKey);
    
    // reset on random x position
    monster.body.reset(
      this.randomRangePadding + (Math.random() * this.gameViewConfiguration.canvasWidth - this.randomRangePadding * 2),
      y
    );
    monster.start();
  }
}