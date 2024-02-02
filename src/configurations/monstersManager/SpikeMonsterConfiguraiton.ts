import { IMonsterConfiguration } from "./IMonsterConfiguration";

export class SpikeMonsterConfiguration implements IMonsterConfiguration
{
  key: string;

  type: string;

  maxFlyingVelocity: number;

  idleAnimation: string;

  madAnimation: string;

  explodeAnimation: string;

  colliderRadius: number;

  visionRadius: number;
}