import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { PadConfiguration } from "../../configurations/padsManager/padConfiguration";
import { PadsManagerConfiguration } from "../../configurations/padsManager/padsManagerConfiguration";
import { IPadsRowGenerator } from "./IPadsRowGenerator";
import { Pad } from "./pad";
import { PadsRowGeneratorFactory } from "./padsRowGeneratorFactory";

/**
 * Manages the pads of the game.
 */
export class PadsManager
{  
  /**
   * The configuration of the pads manager.
   */
  private configuration: PadsManagerConfiguration;

  /**
   * The configuration of the game view.
   */
  private gameViewConfiguration: GameViewConfiguration;

  /**
   * The pads that are currently in game.
   */
  private inGamePads: Array<Pad>;

  /**
   * The idle pads of the game.
   */
  private idlePads: Array<Pad>;

  /**
   * The last pad height.
   */
  private lastPadHeight: number;

  /**
   * The scene of the pads manager.
   */
  private scene: Phaser.Scene;

  /**
   * The physics static group of the pads.
   */
  private physicsStaticGroup: Phaser.Physics.Arcade.StaticGroup;

  /**
   * The pads row generators of the game.
   */
  private padsRowGenerators: Array<IPadsRowGenerator>;

  /**
   * The safe pads row generator of the game.
   */
  private safePadsRowGenerator: IPadsRowGenerator;

  /**
   * The total weight of the pads row generators.
   */
  private padsRowGeneratorsTotalWeight: number;

  /**
   * Gets the physics static group of the pads.
   * 
   * @returns The physics static group of the pads.
   */
  public getPhysicsStaticGroup(): Phaser.Physics.Arcade.StaticGroup
  {
    return this.physicsStaticGroup;
  }

  /**
   * Instantiates a new PadsManager.
   * 
   * @param scene The scene of the game.
   */
  public constructor(scene: Phaser.Scene)
  {
    this.scene = scene;
    this.physicsStaticGroup = scene.physics.add.staticGroup();
    this.inGamePads = new Array<Pad>();
    this.idlePads = new Array<Pad>();
  }

  /**
   * Prepares the pads manager for a new level.
   * 
   * @param configuration The configuration of the pads manager.
   * @param gameViewConfiguration The configuration of the game view.
   */
  public initLevelConfiguration(
    configuration: PadsManagerConfiguration,
    gameViewConfiguration: GameViewConfiguration,
    scene: Phaser.Scene
  )
  { 
    this.configuration = configuration;
    this.gameViewConfiguration = gameViewConfiguration;
    this.scene = scene;

    // Create the pads row generators.
    this.padsRowGeneratorsTotalWeight = 0;
    this.padsRowGenerators = new Array<IPadsRowGenerator>();
    for (let i = 0; i < this.configuration.padsRowGenerators.length; i++)
    {
      this.padsRowGenerators.push(
        PadsRowGeneratorFactory.Create(
          this.gameViewConfiguration,
          this.configuration.padsRowGenerators[i]
        )
      );
      this.padsRowGeneratorsTotalWeight += this.configuration.padsRowGenerators[i].weight;
    }

    this.safePadsRowGenerator = PadsRowGeneratorFactory.Create(
      this.gameViewConfiguration,
      this.configuration.safePadsRowGenerator
    );

    this.onLevelReset();
  }

  /**
   * Updates the pads manager.
   * 
   * @param currentViewTopValue The current top value of the view.
   */
  public update(currentViewTopValue: number)
  {
    this.updatePads(currentViewTopValue);
    
    while (this.lastPadHeight - currentViewTopValue >= this.configuration.inBetweenVSpace)
    {
      this.placePadsRow(this.lastPadHeight - this.configuration.inBetweenVSpace);
      this.lastPadHeight -= this.configuration.inBetweenVSpace;
      return;
    }
  }

  /**
   * Called by the GameManager when the level is reset.
   */
  public onLevelReset()
  {
    this.inGamePads.forEach((pad) => {
      pad.setVisible(false);
      pad.disableBody(true, true);
      this.idlePads.push(pad);
    });

    this.inGamePads = new Array<Pad>();
    this.lastPadHeight = this.gameViewConfiguration.canvasHeight - this.configuration.inBetweenVSpace;

    this.placeSafeRow();
    this.placeSafeRow();
    this.placeSafeRow();
    this.placeSafeRow();
  }

  public placePadBykey(x: number, y: number, key: string)
  {
    let padConfiguration = this.getPadConfiguration(key);
    if (padConfiguration == null)
    {
      console.error("No pad configuration found for: " + key);
      return;
    }

    this.placePad(x, y, padConfiguration);
  }

  /**
   * Place a row of safe pads.
   */
  private placeSafeRow()
  {
    this.lastPadHeight -= this.configuration.inBetweenVSpace;
    this.safePadsRowGenerator.generateRow(this, this.lastPadHeight);
  }

  /**
   * Updates the pads. If a pad is out of bounds, it will be removed from the
   * in game pads and added to the idle pads.
   * 
   * @param currentViewTopValue The current view top value.
   */
  private updatePads(currentViewTopValue: number)
  {
    for (let i = this.inGamePads.length - 1; i >= 0; i--)
    {
      let pad = this.inGamePads[i];
      if (pad.isOutOfBounds(currentViewTopValue, this.gameViewConfiguration.canvasHeight))
      {
        this.inGamePads.splice(i, 1);
        this.idlePads.push(pad);
        
        pad.setVisible(false);
        pad.disableBody(true, true);
      }
    }
  }

   /**
   * Place a pad at the given y position. If there are no idle pads, a new pad
   * will be created.
   *
   * @param xPosition The x position of the pad.
   * @param yPosition The y position of the pad.
   */
  private placePad(xPosition: number, yPosition: number, padConfiguration: PadConfiguration)
  {
    if (this.idlePads.length == 0)
    {
      let pad = this.createPad(
        xPosition,
        yPosition,
        padConfiguration
      );

      this.inGamePads.push(pad);
    }
    else
    {
      let pad = this.idlePads.pop();
      pad.setPosition(
        xPosition,
        yPosition
      );

      pad.init(padConfiguration);
      pad.setVisible(true);
      pad.enableBody(true, pad.x, pad.y, true, true);
      pad.refreshBody();

      this.inGamePads.push(pad); 
    }
  }

  /**
   * Creates a new pad.
   * 
   * @param xPosition The x position of the pad. 
   * @param yPosition The y position of the pad.
   * @param textureKey The texture key of the pad.
   * 
   * @returns The new pad. 
   */
  private createPad(
    xPosition: number,
    yPosition: number,
    configuration: PadConfiguration
  ): Pad
  {
    let pad = new Pad(
      this.scene,
      xPosition,
      yPosition,
      configuration.imageKey
    );

    this.scene.add.existing(pad);
    this.physicsStaticGroup.add(pad);

    pad.init(configuration);
    return pad;
  }

  /**
   * Places a row of pads at the given y position. The pads will be placed
   * according to the configuration. If there are no idle pads, new pads will
   * be created.
   * 
   * @param yPosition  The y position of the row.
   */
  private placePadsRow(yPosition: number)
  {
    let padRowConfiguration = this.getRandomPadsRowGenerator();
    if (padRowConfiguration == null)
    {
      console.error("No pad row configuration found");
      return;
    }

    padRowConfiguration.generateRow(this, yPosition);
  }

  /**
   * Returns the pad configuration for the given key.
   * 
   * @param key The key of the pad configuration.
   * 
   * @returns The pad configuration for the given key.
   */
  private getPadConfiguration(key: string): PadConfiguration
  {
    for (let i = 0; i < this.configuration.pads.length; i++)
    {
      if (this.configuration.pads[i].key == key)
      {
        return this.configuration.pads[i];
      }
    }

    return null;
  }

  /**
   * Returns a random pads row generator.
   * 
   * @returns A random pads row generator.
   */
  private getRandomPadsRowGenerator(): IPadsRowGenerator
  {
    let randomValue = Math.random() * this.padsRowGeneratorsTotalWeight;
    let accumulatedWeight = 0;
    for (let i = 0; i < this.padsRowGenerators.length; i++)
    {
      accumulatedWeight += this.padsRowGenerators[i].getWeight();
      if (randomValue < accumulatedWeight)
      {
        return this.padsRowGenerators[i];
      }
    }

    return null;
  }
}
