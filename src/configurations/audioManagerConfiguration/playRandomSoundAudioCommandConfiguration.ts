import { IAudioCommandConfiguration } from "./iAudioCommandConfiguration";

export class PlayRandomSoundAudioCommandConfiguration implements IAudioCommandConfiguration
{
  /**
   * Indicates the type of audio command.
   */
  public type: string;

  /**
   * The identifier of this command.
   */
  public key: string;

  /**
   * The identifiers of the audio to play.
   */
  public audioKeys: string[];
}