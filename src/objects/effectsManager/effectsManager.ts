import { EffectsManagerConfiguration } from "../../configurations/effectsConfiguration/effectsManagerConfiguration";
import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { EffectPool } from "./effectPool";

export class EffectsManager
{
  private jumpPool: EffectPool;
  private effectsContainer: Phaser.GameObjects.Container;

  public init(scene: Phaser.Scene, config: EffectsManagerConfiguration)
  {
    this.effectsContainer = scene.add.container();
    this.effectsContainer.setDepth(LayersDepthConfiguration.EFFECTS);

    this.jumpPool = new EffectPool();
    this.jumpPool.init(scene, this.effectsContainer, config.jump);
  }

  public playJump(x: number, y: number)
  {
    this.jumpPool.playEffect(x, y);
  }
}