import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { BatMonsterConfiguration } from "../../configurations/monstersManager/BatMonsterConfiguration";
import { SteeringForces } from "../../utilities/steeringForces";
import { Player } from "../player/player";
import { IMonster } from "./IMonster";
import { IMonsterListener } from "./IMonsterListeners";
import { MonsterState } from "./MonsterState";

export class BatMonster extends Phaser.Physics.Arcade.Sprite implements IMonster
{ 
  private configuration: BatMonsterConfiguration;
  private monsterState: MonsterState;
  private batListeners: IMonsterListener[];
  private player: Player;

  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y, "monster-1-flying", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.batListeners = [];
    this.setOrigin(0.5, 0.5);
    this.setDepth(LayersDepthConfiguration.ENEMIES);
  } 

  public init(
    configuration: BatMonsterConfiguration,
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

    this.disable();
  }

  public start(): void {
    if (this.monsterState !== MonsterState.Inactive)
      return;
    
    this.body.enable = true;
    this.visible = true;
    this.body.checkCollision.none = false;
    this.angle = 0;
    
    this.monsterState = MonsterState.Seeking;
    this.play(this.configuration.flyingAnimation);
    this.refreshBody();
  }

  public update(dt: number): void
  {
    super.update(dt);

    if (this.monsterState === MonsterState.Inactive)
      return;
    else if (this.monsterState === MonsterState.Seeking)
      this.updateSeekingState(dt);
    else if (this.monsterState === MonsterState.Dead)
      this.updateDyingState(dt);
      

    if (this.isOutOfBounds(this.scene.cameras.main.worldView.y, this.scene.game.canvas.height))
    {
      this.kill();
      return;
    }
  }

  public kill(): void
  {
    this.monsterState = MonsterState.Inactive;
    this.disable();
    
    this.batListeners.forEach((listener) => {
      listener.onMonsterKilled(this);
    });
  }

  public addMonsterListener(listener: IMonsterListener): void
  {
    this.batListeners.push(listener);
  }

  public onPlayerCollision(player: Player): void {
    if (this.monsterState === MonsterState.Inactive
      || this.monsterState === MonsterState.Dead)
      return;

    player.receiveDamage();
    this.startDeath();
  }

  private updateSeekingState(dt: number): void
  {
    if (this.player == null)
      return;

    // calculate flying force
    const currentVelocity = this.body.velocity;
    const desiredFlyingVelocity = new Phaser.Math.Vector2(0, -this.configuration.maxFlyingVelocity);    
    const flyingForce = desiredFlyingVelocity.subtract(currentVelocity);

    // calculate seek force
    const forceV = SteeringForces.Seek(
      this.player.body.center,
      this.body.center,
      this.body.velocity,
      this.configuration.maxSeekVelocity
    );

    // Flip texture according to the direction of the seeking force
    if (forceV.x > 0)
      this.setFlipX(true);
    else if (forceV.x < 0)
      this.setFlipX(false);

    // Apply total force
    const totalForce = forceV.add(flyingForce);
    this.body.velocity.add(totalForce.scale(dt * 0.001));
  }

  private updateDyingState(dt: number): void
  {
    this.angle += this.configuration.monsterDyingRotationSpeed * dt * 0.001;
  }

  /**
   * Disable the monster body and hide it.
   */
  private disable(): void
  {
    this.body.enable = false;
    this.visible = false;
  }

  private startDeath(): void
  {
    this.body.checkCollision.none = true;
    this.monsterState = MonsterState.Dead;
    this.play(this.configuration.dyingAnimation);
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
}