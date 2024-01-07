import { PlayerConfiguration } from "../../configurations/player/playerConfiguration";
import { Pad } from "../padsManager/pad";

export class Player extends Phaser.Physics.Arcade.Sprite
{
  private playerConfiguration: PlayerConfiguration;

  public init(configuration: PlayerConfiguration)
  {
    this.playerConfiguration = configuration;
    this.setScale(configuration.scaleX, configuration.scaleY);
    this.refreshBody();
  }

  public moveLeft()
  {
    this.setVelocityX(-this.playerConfiguration.movementVelocity);
  }

  public moveRight()
  {
    this.setVelocityX(this.playerConfiguration.movementVelocity);  
  }

  public stopXMovement()
  {
    this.setVelocityX(0);
  }

  public OnPadCollision()
  {
    if (this.body.touching.down && this.body.velocity.y >= 0)
      this.setVelocityY(-this.playerConfiguration.jumpVelocity);
  }

  public isOutOfBounds(
    currentViewTopValue: number,
    canvasHeight: number
  ): boolean
  {
    return this.y > (currentViewTopValue + canvasHeight);
  }
}