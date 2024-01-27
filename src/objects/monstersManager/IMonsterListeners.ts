import { IMonster } from "./IMonster";

export interface IMonsterListener
{
  onMonsterCreated(monster: IMonster): void;
  onMonsterKilled(monster: IMonster): void;
}