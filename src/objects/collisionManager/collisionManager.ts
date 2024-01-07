import { Player } from "../player/player";

export class CollisionManager {
  
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
  ): void {
    let playerInstance: Player = <Player>player;
    playerInstance.OnPadCollision();
  }
}