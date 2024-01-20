import { IAudioCommandConfiguration } from "./iAudioCommandConfiguration";

export class PlaySoundAudioCommandConfiguration implements IAudioCommandConfiguration
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
   * The identifier of the audio to play.
   */
  public audioKey: string;
}