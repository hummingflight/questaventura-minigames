export class BackgroundLayerConfiguration
{
  /**
   * The key of the endless image.
   */
  public imageKey: string;

  /**
   * The depth of the background. Values between 0 and 1, where 0 is the closest
   * point and 1 the farthest point.
   */
  public depth: number;
}