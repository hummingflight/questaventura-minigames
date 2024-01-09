export interface IGameManagerListener
{
  onGameWon(): void;
  onGameLost(): void;
}