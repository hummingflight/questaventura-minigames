import { PlaySoundAudioCommandConfiguration } from "../../configurations/audioManagerConfiguration/playSoundAudioCommandConfiguration";
import { AudioManager } from "./audioManager";
import { IAudioCommand } from "./iAudioCommand";

export class PlaySoundAudioCommand implements IAudioCommand
{
  /**
   * The configuration of this command.
   */
  private configuration: PlaySoundAudioCommandConfiguration;

  /**
   * Instantiates a new PlaySoundAudioCommand. 
   * 
   * @param audioKey The identifier of the audio to play.
   */
  public constructor(configuration: PlaySoundAudioCommandConfiguration)
  {
    this.configuration = configuration;
  }

  /**
   * Executes this command.
   */
  public execute(audioManager: AudioManager): void
  {
    audioManager.playSound(this.configuration.audioKey);
  }
}