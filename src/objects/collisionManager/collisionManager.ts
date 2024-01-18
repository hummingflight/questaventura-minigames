import { Pad } from "../padsManager/pad";
import { Player } from "../player/player";

/**
 * Manages the collision callbacks of the game.
 */
export class CollisionManager {
  
  /**
   * Initialize this CollisionManager with the given parameters.
   * 
   * @param scene The scene of the game. 
   * @param player The player instance of the game.
   * @param pads The group of pads of the game.
   */
  public init(
    scene: Phaser.Scene,
    player: Player,
    pads: Phaser.Physics.Arcade.StaticGroup
  ): void
  {
    scene.physics.add.collider(player, pads, this.onPlayerPadCollision, null, this);
  }

  private onPlayerPadCollision(
    player: Phaser.Physics.Arcade.Sprite,
    pad: Phaser.Physics.Arcade.Sprite
  ): void
  {
    let playerInstance: Player = <Player>player;
    playerInstance.OnPadCollision(<Pad>pad);
  }
}