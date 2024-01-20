import { AudioManager } from "../audioManager/audioManager";

/**
 * Manages the sounds of the player.
 */
export class PlayerSounds
{
  private audioManager: AudioManager;

  public constructor(audioManager: AudioManager)
  {
    this.audioManager = audioManager;
  }

  public init(): void
  {
    // TODO player sound configuration
  }

  public playJumpSound(): void
  {
    this.audioManager.executeCommand("jump");
  }
}