import { PlayRandomSoundAudioCommandConfiguration } from "../../configurations/audioManagerConfiguration/playRandomSoundAudioCommandConfiguration";
import { AudioManager } from "./audioManager";
import { IAudioCommand } from "./iAudioCommand";

/**
 * Plays a random sound from the given list of audio keys.
 */
export class PlayRandomSoundAudioCommand implements IAudioCommand
{
  /**
   * The configuration of this command.
   */
  private configuration: PlayRandomSoundAudioCommandConfiguration

  /**
   * Instantiates a new PlayRandomSoundAudioCommand. 
   * 
   * @param configuration The configuration of this command.
   */
  public constructor(configuration: PlayRandomSoundAudioCommandConfiguration)
  {
    this.configuration = configuration;
  }

  /**
   * Executes this command.
   */
  execute(audioManager: AudioManager, volumen: number): void
  {
    if (this.configuration.audioKeys.length === 0)
      return;

    const randomIndex = Phaser.Math.Between(0, this.configuration.audioKeys.length - 1);
    audioManager.playSound(this.configuration.audioKeys[randomIndex], volumen);
  }
}