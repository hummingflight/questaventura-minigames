export interface IGameManagerListener
{
  onLevelWon(): void;
  onLevelLost(): void;
  onGameWon(): void;
  onGameLost(): void;
}