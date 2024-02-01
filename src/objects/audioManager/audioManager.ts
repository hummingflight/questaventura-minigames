import { AudioManagerConfiguration } from "../../configurations/audioManagerConfiguration/audioManagerConfiguration";
import { PlayRandomSoundAudioCommandConfiguration } from "../../configurations/audioManagerConfiguration/playRandomSoundAudioCommandConfiguration";
import { PlaySoundAudioCommandConfiguration } from "../../configurations/audioManagerConfiguration/playSoundAudioCommandConfiguration";
import { AudioChannel } from "./audioChannel";
import { IAudioCommand } from "./iAudioCommand";
import { PlayRandomSoundAudioCommand } from "./playRandomSoundAudioCommand";
import { PlaySoundAudioCommand } from "./playSoundAudioCommand";

export class AudioManager
{
  private sounds: Map<string, Phaser.Sound.BaseSound>;
  private commands: Map<string, IAudioCommand>;
  private musicVolume: number;
  private sfxVolume: number;
  private mute: boolean;

  /**
   * Gets the music volume of this AudioManager.
   */
  public get MusicVolume(): number
  {
    return this.musicVolume;
  }

  /**
   * Sets the music volume of this AudioManager.
   */
  public set MusicVolume(value: number)
  {
    this.musicVolume = Math.max(0, Math.min(1, value));
  }

  /**
   * Gets the sound effects volume of this AudioManager.
   */
  public get SfxVolume(): number
  {
    return this.sfxVolume;
  }

  /**
   * Sets the sound effects volume of this AudioManager.
   */
  public set SfxVolume(value: number)
  {
    this.sfxVolume = Math.max(0, Math.min(1, value));
  }

  /**
   * Gets the mute state of this AudioManager.
   */
  public get Mute(): boolean
  {
    return this.mute;
  }

  /**
   * Sets the mute state of this AudioManager.
   */
  public set Mute(value: boolean)
  {
    this.mute = value;
  }

  /**
   * Instantiates a new AudioManager.
   */
  public constructor()
  {
    this.sounds = new Map<string, Phaser.Sound.BaseSound>();
    this.commands = new Map<string, IAudioCommand>();
    this.musicVolume = 1;
    this.sfxVolume = 1;
    this.mute = false;
  }

  /**
   * Creates and adds the sound commands to this AudioManager.
   *
   * @param configuration The configuration to use for creation. 
   */
  public prepareAudioCommands(configuration: AudioManagerConfiguration): void
  {
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
   * Prepares the scene with the given configuration. Adds the sounds to the
   * scene's sound manager.
   *
   * @param scene The scene to prepare.
   * @param configuration The configuration to use for preparation.
   */
  public prepareScene(
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
  }

  /**
   * Plays the sound with the given key.
   * 
   * @param key The key of the sound to play.
   * @param volume The volume to play the sound at.
   */
  public playSound(key: string, volume: number = 1): void
  {
    if (this.mute)
      return;

    this.sounds.get(key).play(
      {
        volume: volume
      }
    );
  }

  public playSoundAtChannel(key: string, channel: AudioChannel)
  {
    if (this.mute)
      return;

    if (channel === AudioChannel.Music)
      this.sounds.get(key).play(
        {
          volume: this.musicVolume
        }
      );
    else
      this.sounds.get(key).play(
        {
          volume: this.sfxVolume
        }
      );
  }

  /**
   * Executes the command with the given key.
   * 
   * @param key The key of the command to execute.
   * @param key The channel to play the sound on.
   */
  public executeCommand(key: string, channel: AudioChannel = AudioChannel.Sfx): void
  {
    if (this.mute)
      return;

    if (!this.commands.has(key))
    {
      console.warn("AudioManager: command key does not exist. Key: " + key + ".");
      return;
    }

    if (channel === AudioChannel.Music)
      this.commands.get(key).execute(this, this.musicVolume);
    else    
      this.commands.get(key).execute(this, this.sfxVolume);
  }
}