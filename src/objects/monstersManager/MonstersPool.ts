import { MonstersPoolConfiguraiton as MonstersPoolConfiguration } from "../../configurations/monstersManager/MonstersPoolConfiguration";
import { IMonster } from "./IMonster";
import { MonsterFactory } from "./MonsterFactory";
import { MonsterPool } from "./MonsterPool";

export class MonstersPool
{
  private monstersPool: Map<string, MonsterPool>;

  public init(configuration: MonstersPoolConfiguration, factory: MonsterFactory): void
  {
    this.monstersPool = new Map<string, MonsterPool>();

    for (let i = 0; i < configuration.pools.length; i++)
    {
      const monstersPoolConfiguration = configuration.pools[i];
      const monstersPool = new MonsterPool();
      monstersPool.init(monstersPoolConfiguration, factory);
      this.monstersPool.set(monstersPoolConfiguration.monsterKey, monstersPool);
    }
  }

  public update(dt: number): void
  {
    for (const pool of this.monstersPool.values())
      pool.update(dt);
  }

  public onLevelReset(): void
  {
    for (const pool of this.monstersPool.values())
      pool.onLevelReset();
  }

  public getMonster(key: string): IMonster
  {
    const pool = this.monstersPool.get(key);
    if (!pool)
    {
      throw new Error(`Monster pool not found for key ${key}`);
    }
    return pool.get();
  }

  public destroy(): void
  {
    for (const pool of this.monstersPool.values())
      pool.destroy();

    this.monstersPool.clear();
  }
}