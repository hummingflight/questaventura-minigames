import { GameViewConfiguration } from "../../configurations/gameViewConfiguration/gameViewConfiguration";
import { PadConfiguration } from "../../configurations/padsManager/padConfiguration";
import { PadsManagerConfiguration } from "../../configurations/padsManager/padsManagerConfiguration";
import { PadsRowConfiguration } from "../../configurations/padsManager/padsRowConfiguration";
import { Pad } from "./pad";

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
   * Initializes the pads manager.
   * 
   * @param configuration The configuration of the pads manager.
   * @param gameViewConfiguration The configuration of the game view.
   */
  public init(
    configuration: PadsManagerConfiguration,
    gameViewConfiguration: GameViewConfiguration,
    physicsStaticGroup: Phaser.Physics.Arcade.StaticGroup,
    scene: Phaser.Scene
  )
  { 
    this.configuration = configuration;
    this.gameViewConfiguration = gameViewConfiguration;
    this.lastPadHeight = gameViewConfiguration.canvasHeight;
    this.inGamePads = new Array<Pad>();
    this.idlePads = new Array<Pad>();
    this.physicsStaticGroup = physicsStaticGroup;
    this.scene = scene;
  }

  public update(currentViewTopValue: number)
  {
    this.updatePads(currentViewTopValue);
    
    while (Math.abs(currentViewTopValue - this.lastPadHeight) >= this.configuration.inBetweenVSpace)
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
    this.lastPadHeight = this.gameViewConfiguration.canvasHeight;
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
    let padRowsConfiguration = this.getRandomPadsRowConfiguration();
    if (padRowsConfiguration == null)
    {
      console.error("No pad row configuration found");
      return;
    }

    this.placePadsRowByConfig(yPosition, padRowsConfiguration);
  }

  /**
   * Places a row of pads at the given y position. The pads will be placed
   * according to the given configuration. If there are no idle pads, new pads
   * will be created.
   * 
   * @param yPosition The y position of the row. 
   * @param padsRowConfiguration The configuration of the row.
   */
  private placePadsRowByConfig(yPosition: number, padsRowConfiguration: PadsRowConfiguration)
  {
    let inBetweenHSpace = this.gameViewConfiguration.canvasWidth / (padsRowConfiguration.numPads + 1);
    let xPosition = inBetweenHSpace;

    for (let i = 0; i < padsRowConfiguration.numPads; i++)
    {
      this.placePad(xPosition, yPosition);
      xPosition += inBetweenHSpace;
    }
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
  private placePad(xPosition: number, yPosition: number)
  {
    let padConfiguration = this.getRandomPadConfiguration();
    if (padConfiguration == null)
    {
      console.error("No pad configuration found");
      return;
    }      

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
   * Returns a random pads row configuration.
   * 
   * @returns A random pads row configuration.
   */
  private getRandomPadsRowConfiguration(): PadsRowConfiguration
  {
    let totalWeight = 0;
    for (let i = 0; i < this.configuration.padsRows.length; i++)
    {
      totalWeight += this.configuration.padsRows[i].chance;
    }

    let randomValue = Math.random() * totalWeight;
    let accumulatedWeight = 0;
    for (let i = 0; i < this.configuration.padsRows.length; i++)
    {
      accumulatedWeight += this.configuration.padsRows[i].chance;
      if (randomValue < accumulatedWeight)
      {
        return this.configuration.padsRows[i];
      }
    }

    return null;
  }

  /**
   * Returns a random pad configuration.
   * 
   * @returns A random pad configuration.
   */
  private getRandomPadConfiguration(): PadConfiguration
  {
    let totalWeight = 0;
    for (let i = 0; i < this.configuration.padsChance.length; i++)
    {
      totalWeight += this.configuration.padsChance[i].chance;
    }

    let randomValue = Math.random() * totalWeight;
    let accumulatedWeight = 0;
    let padChanceConfiguration = null;
    for (let i = 0; i < this.configuration.padsChance.length; i++)
    {
      accumulatedWeight += this.configuration.padsChance[i].chance;
      if (randomValue < accumulatedWeight)
      {
        padChanceConfiguration = this.configuration.padsChance[i];
        break;
      }
    }

    if (padChanceConfiguration != null)
    {
      for (let i = 0; i < this.configuration.pads.length; i++)
      {
        if (this.configuration.pads[i].key == padChanceConfiguration.key)
        {
          return this.configuration.pads[i];
        }
      }
    }

    return null;
  }
}
