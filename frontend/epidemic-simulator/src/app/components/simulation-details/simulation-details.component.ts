import {Component, Input, OnInit} from '@angular/core';
import {Simulation} from "../../models/Simulation";
import {Observable, switchMap} from "rxjs";
import {HttpSimulationService} from "../../services/http-simulation.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Location} from "@angular/common";
import {SimulationFormComponent} from "../simulation-form/simulation-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-simulation-details',
  templateUrl: './simulation-details.component.html',
  styleUrls: ['./simulation-details.component.css']
})
export class SimulationDetailsComponent implements OnInit {
  simulationDetails: Observable<Simulation>;

  constructor(private httpSimulationService: HttpSimulationService, private route: ActivatedRoute, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.simulationDetails = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.httpSimulationService.getSimulation(params.get('id')!))
    )
  }

  editSimulation(simulation: Simulation) {
    const dialogRef = this.dialog.open(SimulationFormComponent, {
      data: {
        simulation: simulation,
        saveClicked: false,
        cancelClicked: false,
        linear: false,
        completed: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        if (result.saveClicked) {
          this.httpSimulationService.changeSimulation(simulation.id!, simulation).subscribe(()=>{
            this.simulationDetails = this.route.paramMap.pipe(
              switchMap((params: ParamMap) => this.httpSimulationService.getSimulation(params.get('id')!))
            )
          })
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  formatNumbers(numberToFormat: number): string {
    return numberToFormat.toLocaleString();
  }

}
