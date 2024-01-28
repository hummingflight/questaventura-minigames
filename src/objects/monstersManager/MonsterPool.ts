import { MonsterPoolConfiguration } from "../../configurations/monstersManager/MonsterPoolConfiguration";
import { IMonster } from "./IMonster";
import { IMonsterListener } from "./IMonsterListeners";
import { MonsterFactory } from "./MonsterFactory";

export class MonsterPool implements IMonsterListener
{ 
  private factory: MonsterFactory;
  private inactiveMonsters: Array<IMonster>;
  private activeMonsters: Array<IMonster>;
  private monsterKey: string;

  public init(config: MonsterPoolConfiguration, factory: MonsterFactory): void
  {
    this.factory = factory;
    this.monsterKey = config.monsterKey;
    this.inactiveMonsters = [];
    this.activeMonsters = [];

    for (let i = 0; i < config.initialPoolSize; i++)
      this.inactiveMonsters.push(this.createMonster());
  }

  public get(): IMonster
  {
    let monster = this.inactiveMonsters.pop();
    if (!monster)
    {
      monster = this.createMonster();
    }

    this.activeMonsters.push(monster);
    return monster;
  }

  public update(dt: number): void
  {
    for (const monster of this.activeMonsters)
      monster.update(dt);
  }

  public onMonsterCreated(monster: IMonster): void {
    // Intentionally left blank.
  }

  public onMonsterKilled(monster: IMonster): void {
    this.inactiveMonsters.push(monster);

    const index = this.activeMonsters.indexOf(monster);
    if (index !== -1)
      this.activeMonsters.splice(index, 1);
  }

  public destroy(): void
  {
    for (const monster of this.inactiveMonsters)
      monster.destroy();

    for (const monster of this.activeMonsters)
      monster.destroy();

    this.inactiveMonsters = [];
    this.activeMonsters = [];
  }

  public onLevelReset(): void
  {
    for (let i = this.activeMonsters.length - 1; i >= 0; i--)
    {
      const monster = this.activeMonsters[i];
      monster.kill();
    }
  }

  private createMonster(): IMonster
  {
    const monster = this.factory.create(this.monsterKey);
    monster.addMonsterListener(this);
    return monster;
  }
}