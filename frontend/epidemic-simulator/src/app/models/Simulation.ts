import {SimulationDay} from "./SimulationDay";

export interface Simulation {
  id?: number;
  name: string;
  populationSize: number;
  startInfectedCount: number;
  rratio: number;
  mratio: number;
  daysToRecovery: number;
  daysToDeath: number;
  simulationLength: number;
  days?: SimulationDay[];
}
