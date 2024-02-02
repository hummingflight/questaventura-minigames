import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { SpikeMonsterConfiguration } from "../../configurations/monstersManager/SpikeMonsterConfiguraiton";
import { Player } from "../player/player";
import { IMonster } from "./IMonster";
import { IMonsterListener } from "./IMonsterListeners";
import { MonsterState } from "./MonsterState";

export class SpikeMonster extends Phaser.Physics.Arcade.Sprite implements IMonster
{
  private configuration: SpikeMonsterConfiguration;
  private monsterState: MonsterState;
  private spikeListeners: IMonsterListener[];
  private player: Player;

  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y, "monster-spikes", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.spikeListeners = [];
    this.setOrigin(0.5, 0.5);
    this.setDepth(LayersDepthConfiguration.ENEMIES);
  } 

  init(
    configuration: SpikeMonsterConfiguration,
    player: Player
  ): void
  {
    this.configuration = configuration;
    this.monsterState = MonsterState.Inactive;
    this.player = player;

    this.body.setCircle(
      this.configuration.colliderRadius,
      this.configuration.colliderRadius,
      this.configuration.colliderRadius
    );

    this.body.checkCollision.none = true;
    this.body.enable = false;
    this.visible = false;
  }

  start(): void
  {
    if (this.monsterState !== MonsterState.Inactive)
      return;

    this.body.enable = true;
    this.visible = true;
    this.body.checkCollision.none = false;
    this.angle = 0;

    this.monsterState = MonsterState.Idle;
    this.play(this.configuration.idleAnimation);
    this.refreshBody();
  }

  public update(dt: number): void
  {
    if (this.monsterState === MonsterState.Inactive
      || this.monsterState === MonsterState.Dead)
      return;

    if (this.monsterState === MonsterState.Idle)
      this.updateIdleState(dt);
    else if (this.monsterState === MonsterState.Attacking)
      this.updateMadState(dt);

    if (this.isOutOfBounds(this.scene.cameras.main.worldView.y, this.scene.sys.canvas.height))
    {
      this.kill();
      return;
    }
  }

  kill(): void
  {
    this.stop();
    this.monsterState = MonsterState.Inactive;
    this.body.enable = false;
    this.visible = false;

    this.spikeListeners.forEach((listener) => {
      listener.onMonsterKilled(this);
    });
  }

  onPlayerCollision(player: Player): void
  {
     if (this.monsterState === MonsterState.Inactive
      || this.monsterState === MonsterState.Dead)
      return;

    player.receiveDamage();
    this.explode();
  }

  addMonsterListener(listener: IMonsterListener): void
  {
    this.spikeListeners.push(listener);
  }

  private updateIdleState(dt: number): void
  {
    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    if (distanceToPlayer < this.configuration.visionRadius)
    {
      this.monsterState = MonsterState.Attacking;
      this.play(this.configuration.madAnimation, true);
    }

    this.applyFlyingForce(dt);
    this.updateTextureFlip();
  }

  private updateMadState(dt: number): void
  {
    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    if (distanceToPlayer > this.configuration.visionRadius)
    {
      this.monsterState = MonsterState.Idle;
      this.stop();
      this.play(this.configuration.idleAnimation, true);
    }

    this.applyFlyingForce(dt);
    this.updateTextureFlip();
  }

  /**
   * Starts the explosion animation and kills the monster.
   */
  private explode(): void
  {
    this.monsterState = MonsterState.Dead;
    this.body.checkCollision.none = true;
    this.play(this.configuration.explodeAnimation);
    this.once("animationcomplete", () => {
      this.kill();
    });
  }

  /**
   * Indicates if the player is out of bounds (below the camera view).
   * 
   * @param currentViewTopValue The current top value of the camera view.
   * @param canvasHeight The height of the canvas.
   * 
   * @returns True if the player is out of bounds, false otherwise.
   */
  private isOutOfBounds(
    currentViewTopValue: number,
    canvasHeight: number
  ): boolean
  {
    return this.y > (currentViewTopValue + canvasHeight);
  }

  private applyFlyingForce(dt: number): void
  {
    const currentVelocity = this.body.velocity;
    const desiredFlyingVelocity = new Phaser.Math.Vector2(0, -this.configuration.maxFlyingVelocity);    
    const flyingForce = desiredFlyingVelocity.subtract(currentVelocity);
    this.body.velocity.add(flyingForce.scale(dt * 0.001));
  }

  private updateTextureFlip(): void
  {
    if (this.player.x > this.x)
      this.setFlipX(true);
    else if (this.player.x < this.x)
      this.setFlipX(false);
  }
}