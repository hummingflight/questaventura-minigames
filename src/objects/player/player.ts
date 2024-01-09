import { PlayerConfiguration } from "../../configurations/player/playerConfiguration";
import { IPlayerListener } from "./iPlayerListener";

export class Player extends Phaser.Physics.Arcade.Sprite
{
  private canvasHeight: number;
  private playerConfiguration: PlayerConfiguration;
  private playerListeners: IPlayerListener[];

  public init(configuration: PlayerConfiguration, canvasHeight: number): void
  {
    this.playerConfiguration = configuration;
    this.playerListeners = [];
    this.canvasHeight = canvasHeight;
    this.setScale(configuration.scaleX, configuration.scaleY);
    this.refreshBody();
  }

  public update(cameraY: number)
  {
    if (this.isOutOfBounds(cameraY, this.canvasHeight))
      this.playerListeners.forEach((listener) => listener.onPlayerDied());
  }

  /**
   * Adds a listener to the player.
   * 
   * @param listener The listener to add.
   */
  public addPlayerListener(listener: IPlayerListener): void
  {
    this.playerListeners.push(listener);
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