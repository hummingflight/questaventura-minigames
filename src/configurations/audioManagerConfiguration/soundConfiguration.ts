export class SoundConfiguration
{
  /**
   * The identifier of this audio clip.
   */
  public key: string;

  /**
   * The identifier of the audio to play.
   */
  public audioKey: string;

  /**
   * Indicates if the audio is looped.
   */
  public loop: boolean;

  /**
   * The volume of the audio.
   */
  public volume: number;
}