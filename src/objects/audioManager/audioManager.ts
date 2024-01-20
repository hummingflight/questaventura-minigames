import { AudioManagerConfiguration } from "../../configurations/audioManagerConfiguration/audioManagerConfiguration";
import { PlayRandomSoundAudioCommandConfiguration } from "../../configurations/audioManagerConfiguration/playRandomSoundAudioCommandConfiguration";
import { PlaySoundAudioCommandConfiguration } from "../../configurations/audioManagerConfiguration/playSoundAudioCommandConfiguration";
import { IAudioCommand } from "./iAudioCommand";
import { PlayRandomSoundAudioCommand } from "./playRandomSoundAudioCommand";
import { PlaySoundAudioCommand } from "./playSoundAudioCommand";

export class AudioManager
{
  private sounds: Map<string, Phaser.Sound.BaseSound>;
  private commands: Map<string, IAudioCommand>;

  public init(
    scene: Phaser.Scene,
    configuration: AudioManagerConfiguration
  ): void
  {
    this.sounds = new Map<string, Phaser.Sound.BaseSound>();
    for (let sound of configuration.sounds)
    {
      this.sounds.set(
        sound.key,
        scene.sound.add(sound.audioKey)
      );
    }

    this.commands = new Map<string, IAudioCommand>();
    for (let command of configuration.commands)
    {
      if (command.key === undefined)
      {
        console.warn("AudioManager: command key is undefined.");  
        continue;
      }
      
      if (command.type === undefined)
      {
        console.warn("AudioManager: command type is undefined.");
        continue;
      }

      if (this.commands.has(command.key))
      {
        console.warn("AudioManager: command key is not unique. Key: " + command.key + ".");
        continue;
      }

      if (command.type === "playSound")
      {
        this.commands.set(
          command.key,
          new PlaySoundAudioCommand(command as PlaySoundAudioCommandConfiguration)
        );
      }
      else if (command.type === "playRandomSound")
      {
        this.commands.set(
          command.key,
          new PlayRandomSoundAudioCommand(command as PlayRandomSoundAudioCommandConfiguration)
        );
      }
      else
      {
        console.warn("AudioManager: command type is not supported: " + command.type + ".");
        continue;
      }
      
    }
  }

  /**
   * Plays the sound with the given key.
   * 
   * @param key The key of the sound to play.
   */
  public playSound(key: string): void
  {
    this.sounds.get(key).play();
  }

  /**
   * Executes the command with the given key.
   * 
   * @param key The key of the command to execute.
   */
  public executeCommand(key: string): void
  {
    if (!this.commands.has(key))
    {
      console.warn("AudioManager: command key does not exist. Key: " + key + ".");
      return;
    }

    this.commands.get(key).execute(this);
  }
}