import { EffectPoolConfiguration } from "../../configurations/effectsConfiguration/effectPoolConfiguration";

export class EffectPool
{
  private configuration: EffectPoolConfiguration;
  private effectGroup: Phaser.GameObjects.Container;
  private scene: Phaser.Scene;

  private deactiveEffects: Phaser.GameObjects.Sprite[];
  private activeEffects: Phaser.GameObjects.Sprite[];

  public init(
    scene: Phaser.Scene,
    effectGroup: Phaser.GameObjects.Container,
    effectPoolConfiguration: EffectPoolConfiguration
  )
  {
    this.scene = scene;
    this.effectGroup = effectGroup;
    this.configuration = effectPoolConfiguration;
    this.deactiveEffects = [];
    this.activeEffects = [];

    for (let i = 0; i < effectPoolConfiguration.initialPoolSize; i++)
    {
      const effect = this.createEffect();
      this.deactiveEffects.push(effect);
    }
  }

  public playEffect(x: number, y: number)
  {
    if (this.deactiveEffects.length === 0)
    {
      const effect = this.createEffect();
      effect.setActive(true);
    }

    const effect = this.deactiveEffects.pop();
    if (effect)
    {
      effect.setActive(true);
      effect.setVisible(true);
      effect.setPosition(x, y);
      effect.play(this.configuration.effectConfiguration.animationKey);
      this.activeEffects.push(effect);
    }
  }

  private createEffect(): Phaser.GameObjects.Sprite
  {
    const effect = this.scene.add.sprite(
      0,
      0,
      this.configuration.effectConfiguration.initialFrame
    );

    effect.setOrigin(
      this.configuration.effectConfiguration.originX,
      this.configuration.effectConfiguration.originY
    );

    this.effectGroup.add(effect);

    effect.setActive(false);
    effect.setVisible(false);

    effect.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      () => {
        this.onEffectAnimationComplete(effect)
      },
      this
    );

    return effect;
  }  

  private onEffectAnimationComplete(effect: Phaser.GameObjects.Sprite)
  {
    effect.setActive(false);
    effect.setVisible(false);
    this.deactiveEffects.push(effect);
    this.activeEffects.splice(this.activeEffects.indexOf(effect), 1);
  }
}