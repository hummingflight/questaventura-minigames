import { PadsManager } from "./padsManager";

export interface IPadsRowGenerator
{
  getWeight(): number;
  
  generateRow(manager: PadsManager, y: number): void;
}