export class UiSettings
{
  private SOUND_STEP = 0.1;
  private MUTE_ON_KEY = "settings-mute-on.png";
  private MUTE_OFF_KEY = "settings-mute-off.png";

  private uiSettingsContainer: Phaser.GameObjects.Container;

  public init(scene: Phaser.Scene, uiContainer: Phaser.GameObjects.Container): void
  {
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

    const muteToggleBtn = scene.add.sprite(599.1, 1171.912, "main-menu", this.MUTE_OFF_KEY);
    muteToggleBtn.setOrigin(0, 0);
    muteToggleBtn.setInteractive();
    muteToggleBtn.on("pointerdown", this.onMuteTogglePressed, this);
    this.uiSettingsContainer.add(muteToggleBtn);
  }

  public show(): void
  {
    this.uiSettingsContainer.setVisible(true);
  }

  public close(): void
  {
    this.uiSettingsContainer.setVisible(false);
  }

  private onMusicUpPressed(): void
  {
    // Intentionally left empty.
  }

  private onMusicDownPressed(): void
  {
    // Intentionally left empty.
  }

  private onSfxUpPressed(): void
  {
    // Intentionally left empty.
  }

  private onSfxDownPressed(): void
  {
    // Intentionally left empty.
  }

  private onMuteTogglePressed(): void
  {

  }

  private onClosePressed(): void
  {

  }
}