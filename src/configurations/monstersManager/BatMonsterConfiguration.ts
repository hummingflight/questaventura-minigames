import { IMonsterConfiguration } from "./IMonsterConfiguration";

export class BatMonsterConfiguration implements IMonsterConfiguration
{
  key: string;

  type: string;
  
  velocity: number;

  flyingAnimation: string;

  dyingAnimation: string;

  attackingAnimation: string;

  colliderRadius: number;
}