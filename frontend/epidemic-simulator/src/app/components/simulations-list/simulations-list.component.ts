import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpSimulationService} from "../../services/http-simulation.service";
import {Simulation} from "../../models/Simulation";
import {BehaviorSubject,Observer, Subscription,} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SimulationFormComponent} from "../simulation-form/simulation-form.component";

@Component({
  selector: 'app-simulations-list',
  templateUrl: './simulations-list.component.html',
  styleUrls: ['./simulations-list.component.css'],
  animations: [
    trigger('simulationListElementAnimation', [
      transition(':leave', [
        animate("0.5s ease-in-out", style({
          transform: 'translateX(-120%)'
        })),
        animate("0.5s ease-in-out", style({
          opacity: 0,
          height: 0
        }))
      ])
    ]),
    trigger('simulationListLastElementAnimation', [
      transition(':leave', [
        animate("0.5s ease-in-out", style({
          transform: 'translateX(-120%)'
        }))
      ])
    ]),
    trigger('simulationListAddElementAnimation', [
      transition(':enter', [
        style({
          transform: 'translateX(-120%)'
        }),
        animate("0.5s ease-in-out", style({
          transform: 'translateX(0%)'
        }))
      ])
    ])
  ]
})
export class SimulationsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  simulationsBehaviorSubject = new BehaviorSubject<Simulation[]>([]);
  simulations: Simulation[];
  newSimulation: Simulation | null = null;
  saveClicked: boolean = false;
  cancelClicked: boolean = false;

  constructor(private httpSimulationService: HttpSimulationService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.httpSimulationService.getSimulations().subscribe(this.observer());
    const sub = this.simulationsBehaviorSubject.subscribe(
        (simulations: Simulation[]) => {
          this.simulations = simulations;
          console.log('simulations subscription');
      }
    );
    this.subscriptions.push(sub);
  }

  private observer(): Observer<Simulation[]>{
    return {
      next: (simulations: Simulation[]) => {
        this.simulationsBehaviorSubject.next(simulations);
      },
      error: error => console.error(error),
      complete: () => console.log('Complete!')
    }
  }

  deleteSimulation(id: number): void {
    this.httpSimulationService.deleteSimulation(id).subscribe(()=>{
      this.simulationsBehaviorSubject.next(
        this.simulationsBehaviorSubject.value.filter(simulation => {
          return simulation.id != id
        })
      );
    });
  }

  switchToCreatingMode(): void {
    if(!this.newSimulation && !this.saveClicked && !this.cancelClicked) {
      this.newSimulation = {
        name: '',
        populationSize: 1,
        startInfectedCount: 1,
        rratio: 1,
        mratio: 1,
        daysToRecovery: 1,
        daysToDeath: 1,
        simulationLength: 1
      };
    }

    const dialogRef = this.dialog.open(SimulationFormComponent, {
      data: {
        simulation: this.newSimulation,
        saveClicked: this.saveClicked,
        cancelClicked: this.cancelClicked,
        linear: true,
        completed: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        if (result.saveClicked) {
          this.saveNewSimulation(result.simulation);
          this.newSimulation = null;
          this.saveClicked = false;
          this.cancelClicked = false;
        } else if (result.cancelClicked) {
          this.newSimulation = null;
          this.saveClicked = false;
          this.cancelClicked = false;
        }
      }
    });

  }

  saveNewSimulation(simulation: Simulation): void{
    this.httpSimulationService.createSimulation(simulation).subscribe((value)=>{
      const newList = this.simulationsBehaviorSubject.value;
      newList.splice(0,0,value);
      this.simulationsBehaviorSubject.next(newList);
    });

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
