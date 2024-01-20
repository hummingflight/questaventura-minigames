import { AudioManager } from "./audioManager";

/**
 * Interface for audio commands.
 */
export interface IAudioCommand
{
  /**
   * Executes this command.
   */
  execute(audioManager: AudioManager): void;
}