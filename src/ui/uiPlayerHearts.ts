import { IPlayerHeartsListener } from "../objects/player/iPlayerHeartsListener";

export class UiPlayerHearts implements IPlayerHeartsListener
{
  private readonly HEARTS_SPACING: number = 10;
  private readonly HEARTS_Y: number = 120;
  private readonly HEARTS_X: number = 75;

  private scene: Phaser.Scene;
  private uiGroup: Phaser.GameObjects.Container;
  private deactiveHearts: Array<Phaser.GameObjects.Image>;
  private activeHearts: Array<Phaser.GameObjects.Image>;

  public onLoseHeart(hearts: number): void {
    this.setHearts(hearts);
  }

  public onGetHeart(hearts: number): void {
    this.setHearts(hearts);
  }

  public onHeartsChanged(hearts: number): void {
    this.setHearts(hearts);
  }

  public init(
    scene: Phaser.Scene,
    uiGroup: Phaser.GameObjects.Container,
    initialHearts: number
  ): void
  {
    this.scene = scene;
    this.uiGroup = uiGroup;
    this.deactiveHearts = new Array<Phaser.GameObjects.Image>();
    this.activeHearts = new Array<Phaser.GameObjects.Image>();

    this.setHearts(initialHearts);
  }

  private setHearts(hearts: number): void {
    this.deactiveAllHearts();
    for (let i = 0; i < hearts; i++)
    {
      let heart: Phaser.GameObjects.Image = this.getHeart();
      heart.x = i * (heart.width + this.HEARTS_SPACING) + this.HEARTS_X;
      heart.y = this.HEARTS_Y;
      heart.setVisible(true);
      this.activeHearts.push(heart);
    }
  }

  private getHeart(): Phaser.GameObjects.Image
  {
    if (this.deactiveHearts.length > 0)
      return this.deactiveHearts.pop();

    this.createHeart();
    return this.deactiveHearts.pop();
  }

  private createHeart(): void
  {
    let heart: Phaser.GameObjects.Image =
      this.scene.add.image(0, 0, "ui-heart");
    
    this.deactiveHearts.push(heart);
    this.uiGroup.add(heart);
  }

  private deactiveAllHearts(): void
  {
    this.activeHearts.forEach(heart => {
      this.deactiveHearts.push(heart);
      heart.setVisible(false);
    });

    this.activeHearts = new Array<Phaser.GameObjects.Image>();
  }
}