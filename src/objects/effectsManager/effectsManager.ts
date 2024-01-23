import { EffectsManagerConfiguration } from "../../configurations/effectsConfiguration/effectsManagerConfiguration";
import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { EffectPool } from "./effectPool";

export class EffectsManager
{
  private simpleEffects: Map<String, EffectPool>;
  private effectsContainer: Phaser.GameObjects.Container;

  public init(scene: Phaser.Scene, config: EffectsManagerConfiguration)
  {
    this.effectsContainer = scene.add.container();
    this.effectsContainer.setDepth(LayersDepthConfiguration.EFFECTS);

    this.simpleEffects = new Map<String, EffectPool>();
    for (let effect of config.simpleEffects)
    {
      let pool = new EffectPool();
      pool.init(scene, this.effectsContainer, effect.poolSettings);
      
      this.simpleEffects.set(effect.key, pool);
    }
  }

  public playSimpleEffect(key: string, x: number, y: number)
  {
    if (!this.simpleEffects.has(key))
      return;

    this.simpleEffects.get(key).playEffect(x, y);
  }
}