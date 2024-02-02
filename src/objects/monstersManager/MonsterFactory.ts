import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { BatMonsterConfiguration } from "../../configurations/monstersManager/BatMonsterConfiguration";
import { IMonsterConfiguration } from "../../configurations/monstersManager/IMonsterConfiguration";
import { SpikeMonsterConfiguration } from "../../configurations/monstersManager/SpikeMonsterConfiguraiton";
import { PlayerManager } from "../player/playerManager";
import { BatMonster } from "./BatMonster";
import { IMonster } from "./IMonster";
import { SpikeMonster } from "./SpikeMonster";

export class MonsterFactory
{
  private scene: Phaser.Scene;
  private playerManager: PlayerManager;
  private monstersConfigurations: Array<IMonsterConfiguration>;
  private monstersGroup: Phaser.Physics.Arcade.Group;

  public getMonstersGroup(): Phaser.Physics.Arcade.Group
  {
    return this.monstersGroup;
  }

  public init(
    scene: Phaser.Scene,
    monstersConfigurations: Array<IMonsterConfiguration>,
    playerManager: PlayerManager
  ): void
  {
    this.scene = scene;
    this.monstersConfigurations = monstersConfigurations;
    this.monstersGroup = this.scene.physics.add.group();
    this.monstersGroup.setDepth(LayersDepthConfiguration.ENEMIES);
    this.monstersGroup.physicsType = Phaser.Physics.Arcade.DYNAMIC_BODY;
    this.playerManager = playerManager;
  }

  public create(monsterKey: string): IMonster
  {
    const monsterConfiguration = this.monstersConfigurations.find((monsterConfiguration) => {
      return monsterConfiguration.key === monsterKey;
    });

    if (!monsterConfiguration)
    {
      throw new Error(`Monster configuration not found for key ${monsterKey}`);
    }

    switch (monsterConfiguration.key)
    {
      case "black-bat":
        return this.createBat(monsterConfiguration as BatMonsterConfiguration);
      
      case "green-spikes":
        return this.createSpike(monsterConfiguration as SpikeMonsterConfiguration);
      
      default:
        throw new Error(`Monster: ${monsterKey}, does not have an impelmentation in the factory.`);
    }
  }

  public createBat(config : BatMonsterConfiguration): BatMonster
  {
    const bat = new BatMonster(this.scene, 0, 0);
    this.monstersGroup.add(bat);
    bat.init(config, this.playerManager.getPlayer());
    return bat;
  }

  public createSpike(config: SpikeMonsterConfiguration): SpikeMonster
  {
    const spike = new SpikeMonster(this.scene, 0, 0);
    this.monstersGroup.add(spike);
    spike.init(config, this.playerManager.getPlayer());
    return spike;
  }
}