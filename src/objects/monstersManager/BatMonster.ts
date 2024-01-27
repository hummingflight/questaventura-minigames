import { LayersDepthConfiguration } from "../../configurations/layersDepthConfiguration";
import { BatMonsterConfiguration } from "../../configurations/monstersManager/BatMonsterConfiguration";
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

    // Set circle in the middle of the texture
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
    
    this.monsterState = MonsterState.Seeking;
    this.play(this.configuration.flyingAnimation);
    this.refreshBody();
  }

  public update(dt: number): void
  {
    super.update(dt);

    if (this.monsterState === MonsterState.Inactive)
      return;

    if (this.isOutOfBounds(this.scene.cameras.main.worldView.y, this.scene.game.canvas.height))
    {
      this.kill();
      return;
    }
  }

  public kill(): void
  {
    this.state = MonsterState.Inactive;
    this.batListeners.forEach((listener) => {
      listener.onMonsterKilled(this);
    });
  }

  public addMonsterListener(listener: IMonsterListener): void
  {
    this.batListeners.push(listener);
  } 

  public destroy(): void
  {
    // TODO
  }

  private disable(): void
  {
    this.body.enable = false;
    this.visible = false;
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