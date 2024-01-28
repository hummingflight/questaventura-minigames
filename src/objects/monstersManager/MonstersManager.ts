import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { MonsterManagerConfiguration } from "../../configurations/monstersManager/MonsterManagerConfiguration";
import { MonsterFactory } from "./MonsterFactory";
import { MonstersGenerator } from "./MonstersGenerator";
import { MonstersPool } from "./MonstersPool";

export class MonstersManager
{
  private monstersGenerators: Array<MonstersGenerator>;
  private monstersPool: MonstersPool;
  private configuration: MonsterManagerConfiguration;
  private lastMonsterSpawnHeight: number;
  private totalMonstersGeneratorsWeight: number;

  public initLevelConfiguration(
    configuration: MonsterManagerConfiguration,
    gameViewConfiguration: GameViewConfiguration,
    factory: MonsterFactory
  ): void
  {
    this.lastMonsterSpawnHeight = 0;

    if (this.monstersPool != null)
      this.monstersPool.destroy();

    this.configuration = configuration;
    this.monstersGenerators = new Array<MonstersGenerator>();
    this.monstersPool = new MonstersPool();
    this.monstersPool.init(configuration.monstersPool, factory);

    this.totalMonstersGeneratorsWeight = 0;
    for (let i = 0; i < configuration.monstersGenerators.length; i++)
    {
      const monstersGeneratorConfiguration = configuration.monstersGenerators[i];
      const monstersGenerator = new MonstersGenerator();
      monstersGenerator.init(monstersGeneratorConfiguration, gameViewConfiguration, this.monstersPool);
      this.monstersGenerators.push(monstersGenerator);
      this.totalMonstersGeneratorsWeight += monstersGeneratorConfiguration.weight;
    }
  }

  public update(height: number, dt: number): void
  {
    if (this.lastMonsterSpawnHeight - height >= this.configuration.frequency)
    {
      this.lastMonsterSpawnHeight = height;
      const monstersGenerator = this.selectRandomMonsterGenerator();
      monstersGenerator.generate(height);
    }

    this.monstersPool.update(dt);
  }

  public onLevelReset(): void
  {
    this.monstersPool.onLevelReset();
    this.lastMonsterSpawnHeight = 0;
  }

  public selectRandomMonsterGenerator(): MonstersGenerator
  {
    const randomWeight = Math.random() * this.totalMonstersGeneratorsWeight;
    let weightSum = 0;
    for (let i = 0; i < this.monstersGenerators.length; i++)
    {
      const monstersGenerator = this.monstersGenerators[i];
      weightSum += monstersGenerator.GetWeight();
      if (randomWeight <= weightSum)
        return monstersGenerator;
    }
    return null;
  }
}