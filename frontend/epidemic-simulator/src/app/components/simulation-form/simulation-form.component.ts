import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Simulation} from "../../models/Simulation";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface SimulationFormData {
  simulation: Simulation;
  saveClicked: boolean;
  cancelClicked: boolean;
  linear: boolean;
  completed: boolean;
}

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.css']
})
export class SimulationFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public simulationFormData: SimulationFormData) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.simulationFormData.saveClicked = false;
    this.simulationFormData.cancelClicked = true;
  }

  save(): void {
    this.simulationFormData.saveClicked = true;
    this.simulationFormData.cancelClicked = false;
  }

}
