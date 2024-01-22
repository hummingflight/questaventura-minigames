import { IPlayerLivesListener } from "../objects/player/iPlayerLivesListener";

export class UiPlayerLives implements IPlayerLivesListener
{
  private readonly LIVES_SPACING: number = 10;
  private readonly LIVES_Y: number = 120;  

  private scene: Phaser.Scene;
  private uiGroup: Phaser.GameObjects.Container;
  private deactiveLives: Array<Phaser.GameObjects.Image>;
  private activeLives: Array<Phaser.GameObjects.Image>;
  private lives_x: number;

  public onLoseLife(lives: number): void {
    this.setLives(lives);
  }

  public onGetLife(lives: number): void {
    this.setLives(lives);
  }

  public onLivesChanged(lives: number): void {
    this.setLives(lives);
  } 

  public init(
    scene: Phaser.Scene,
    uiGroup: Phaser.GameObjects.Container,
    initialLives: number,
    sceneWidth: number
  ): void
  {
    this.scene = scene;
    this.uiGroup = uiGroup;
    this.deactiveLives = new Array<Phaser.GameObjects.Image>();
    this.activeLives = new Array<Phaser.GameObjects.Image>();
    this.lives_x = sceneWidth - 60;

    this.setLives(initialLives);
  }

  private setLives(lives: number): void {
    this.deactiveAllLives();
    for (let i = 0; i < lives; i++)
    {
      let life: Phaser.GameObjects.Image = this.getLife();
      life.x = this.lives_x - i * (life.width + this.LIVES_SPACING);
      life.y = this.LIVES_Y;
      life.setVisible(true);
      this.activeLives.push(life);
    }
  }

  private getLife(): Phaser.GameObjects.Image
  {
    let heart : Phaser.GameObjects.Image;
    if (this.deactiveLives.length > 0)
    {
      heart = this.deactiveLives.pop();
      heart.setVisible(true);
      return heart;
    }
    else
    {
      this.createLife();
      heart = this.deactiveLives.pop();
      heart.setVisible(true);
      return heart;  
    }
  }

  private createLife(): void
  {
    let life: Phaser.GameObjects.Image = this.scene.add.image(0, 0, 'ui-star');
    life.setVisible(false);
    this.uiGroup.add(life);
    this.deactiveLives.push(life);
  }

  private deactiveAllLives(): void
  {
    this.activeLives.forEach(life => {
      this.deactiveLives.push(life);
      life.setVisible(false);
    });

    this.activeLives = new Array<Phaser.GameObjects.Image>();
  }
}