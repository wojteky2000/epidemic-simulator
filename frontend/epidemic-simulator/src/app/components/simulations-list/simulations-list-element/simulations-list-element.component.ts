import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Simulation} from "../../../models/Simulation";

@Component({
  selector: 'app-simulations-list-element',
  templateUrl: './simulations-list-element.component.html',
  styleUrls: ['./simulations-list-element.component.css']
})
export class SimulationsListElementComponent implements OnInit {
  @Input()
  simulation: Simulation;

  @Output()
  deleteSimulationEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  formatNumbers(numberToFormat: number): string {
    return numberToFormat.toLocaleString();
  }

}
