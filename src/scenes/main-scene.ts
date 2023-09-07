import { EndlessLoopVImages } from '../objects/endlessLoopVImages';
import { init_gamebox } from '../utilities/documentUtils';

export class MainScene extends Phaser.Scene {

  private _y: number = 0;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('forest-bg-1', '../assets/images/forest-bg-1.png');
    
  }

  create(): void {
    
    this.prepareGameDivContainer();   
    
    const particles = this.add.particles('redParticle');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD'
    });

    this._m_endlessLoopVImageTest = new EndlessLoopVImages(
      this,
      'forest-bg-1',
      1920
    );
  }

  update(time: number, delta: number): void
  {
    this._y += 100 * delta * 0.001;
    this.cameras.main.scrollY = this._y;
    this._m_endlessLoopVImageTest.y = this._y;
    this._m_endlessLoopVImageTest.updateImagesPositions();
  }

  private prepareGameDivContainer()
  {
    // The scale mode should fit the game's container.
    this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;

    // initialize the game's container.
    init_gamebox();
  }

  private _m_endlessLoopVImageTest: EndlessLoopVImages;
}
