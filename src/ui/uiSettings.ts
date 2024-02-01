import { AudioChannel } from "../objects/audioManager/audioChannel";
import { AudioManager } from "../objects/audioManager/audioManager";

export class UiSettings
{
  private SOUND_STEP = 0.1;
  private MUTE_ON_KEY = "settings-mute-on.png";
  private MUTE_OFF_KEY = "settings-mute-off.png";

  private uiSettingsContainer: Phaser.GameObjects.Container;
  private audioManager: AudioManager;
  private muteToggleBtn: Phaser.GameObjects.Sprite;
  private musicVolumeBar: Phaser.GameObjects.Sprite;
  private sfxVolumeBar: Phaser.GameObjects.Sprite;

  private volumeBarHeight: number;
  private volumeBarWidth: number;

  public init(
    scene: Phaser.Scene,
    uiContainer: Phaser.GameObjects.Container,
    audioManager: AudioManager
  ): void
  {
    this.audioManager = audioManager;
    this.uiSettingsContainer = scene.add.container(0, 0);
    uiContainer.add(this.uiSettingsContainer);    

    const bg = scene.add.image(0, 0, "settings-bg");
    bg.setOrigin(0, 0);
    bg.setInteractive();
    this.uiSettingsContainer.add(bg);

    const panel = scene.add.image(110, 566.3, "main-menu", "settings-panel.png");
    panel.setOrigin(0, 0);
    this.uiSettingsContainer.add(panel);

    const closeBtn = scene.add.sprite(876.4, 694, "main-menu", "settings-close.png");
    closeBtn.setOrigin(0, 0);
    closeBtn.setInteractive();
    closeBtn.on("pointerdown", this.onClosePressed, this);
    this.uiSettingsContainer.add(closeBtn);

    const musicUpBtn = scene.add.sprite(814.7, 907.24, "main-menu", "settings-plus-button.png");
    musicUpBtn.setOrigin(0, 0);
    musicUpBtn.setInteractive();
    musicUpBtn.on("pointerdown", this.onMusicUpPressed, this);
    this.uiSettingsContainer.add(musicUpBtn);

    const musicDownBtn = scene.add.sprite(195.7, 907.24, "main-menu", "settings-minus-button.png");
    musicDownBtn.setOrigin(0, 0);
    musicDownBtn.setInteractive();
    musicDownBtn.on("pointerdown", this.onMusicDownPressed, this);
    this.uiSettingsContainer.add(musicDownBtn);

    const sfxUpBtn = scene.add.sprite(814.7, 1066.5, "main-menu", "settings-plus-button.png");
    sfxUpBtn.setOrigin(0, 0);
    sfxUpBtn.setInteractive();
    sfxUpBtn.on("pointerdown", this.onSfxUpPressed, this);
    this.uiSettingsContainer.add(sfxUpBtn);

    const sfxDownBtn = scene.add.sprite(195.7, 1066.5, "main-menu", "settings-minus-button.png");
    sfxDownBtn.setOrigin(0, 0);
    sfxDownBtn.setInteractive();
    sfxDownBtn.on("pointerdown", this.onSfxDownPressed, this);
    this.uiSettingsContainer.add(sfxDownBtn);

    this.musicVolumeBar = scene.add.sprite(270.9, 909.8, "main-menu", "settings-bar.png");
    this.musicVolumeBar.setOrigin(0, 0);
    this.uiSettingsContainer.add(this.musicVolumeBar);
    this.volumeBarHeight = this.musicVolumeBar.height;
    this.volumeBarWidth = this.musicVolumeBar.width;

    this.sfxVolumeBar = scene.add.sprite(270.9, 1067.225, "main-menu", "settings-bar.png");
    this.sfxVolumeBar.setOrigin(0, 0);
    this.uiSettingsContainer.add(this.sfxVolumeBar);

    this.muteToggleBtn = scene.add.sprite(599.1, 1171.912, "main-menu", this.MUTE_OFF_KEY);
    this.muteToggleBtn.setOrigin(0, 0);
    this.muteToggleBtn.setInteractive();
    this.muteToggleBtn.on("pointerdown", this.onMuteTogglePressed, this);
    this.uiSettingsContainer.add(this.muteToggleBtn);

    this.updateVolumeBar(this.musicVolumeBar, this.audioManager.MusicVolume);
    this.updateVolumeBar(this.sfxVolumeBar, this.audioManager.SfxVolume);
    this.updateMuteToggleBtn();
  }

  public show(): void
  {
    this.uiSettingsContainer.setVisible(true);
    this.audioManager.playSoundAtChannel("ui-open", AudioChannel.Sfx);
  }

  public close(): void
  {
    this.uiSettingsContainer.setVisible(false);
    this.audioManager.playSoundAtChannel("ui-close", AudioChannel.Sfx);
  }

  private onMusicUpPressed(): void
  {
    this.audioManager.MusicVolume += this.SOUND_STEP;
    this.audioManager.playSoundAtChannel("toom", AudioChannel.Music);
    this.updateVolumeBar(this.musicVolumeBar, this.audioManager.MusicVolume);
  }

  private onMusicDownPressed(): void
  {
    this.audioManager.MusicVolume -= this.SOUND_STEP;
    this.audioManager.playSoundAtChannel("toom", AudioChannel.Music);
    this.updateVolumeBar(this.musicVolumeBar, this.audioManager.MusicVolume);
  }

  private onSfxUpPressed(): void
  {
    this.audioManager.SfxVolume += this.SOUND_STEP;
    this.audioManager.playSoundAtChannel("toom", AudioChannel.Sfx);
    this.updateVolumeBar(this.sfxVolumeBar, this.audioManager.SfxVolume);
  }

  private onSfxDownPressed(): void
  {
    this.audioManager.SfxVolume -= this.SOUND_STEP;
    this.audioManager.playSoundAtChannel("toom", AudioChannel.Sfx);
    this.updateVolumeBar(this.sfxVolumeBar, this.audioManager.SfxVolume);
  }

  private onMuteTogglePressed(): void
  {
    this.audioManager.Mute = !this.audioManager.Mute;
    this.updateMuteToggleBtn();
  }

  private onClosePressed(): void
  {
    this.close();
  }

  private updateMuteToggleBtn(): void
  {
    this.muteToggleBtn.setTexture("main-menu",
      this.audioManager.Mute ? this.MUTE_ON_KEY : this.MUTE_OFF_KEY
    );
  }

  private updateVolumeBar(bar: Phaser.GameObjects.Sprite, volume: number): void
  {
    bar.setCrop(0, 0, this.volumeBarWidth * volume, this.volumeBarHeight);
  }
}