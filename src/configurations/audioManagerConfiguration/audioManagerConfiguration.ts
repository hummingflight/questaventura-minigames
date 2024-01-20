import { IAudioCommandConfiguration } from "./iAudioCommandConfiguration";
import { SoundConfiguration } from "./soundConfiguration";

export class AudioManagerConfiguration
{
  /**
   * The available sounds.
   */
  public sounds: Array<SoundConfiguration>;

  /**
   * The available commands.
   */
  public commands: Array<IAudioCommandConfiguration>;
}