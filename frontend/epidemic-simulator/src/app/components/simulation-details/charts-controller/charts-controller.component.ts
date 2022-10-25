import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {Simulation} from "../../../models/Simulation";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-charts-controller',
  templateUrl: './charts-controller.component.html',
  styleUrls: ['./charts-controller.component.css']
})
export class ChartsControllerComponent implements OnInit {
  @Input()
  simulation: Simulation | null = null;


  day: number;
  lineAllChartData: any[];
  lineInfectionsChartData: any[];
  legendPosition: LegendPosition = LegendPosition.Below;
  lineRecoveredChartData: any[];
  lineDeadChartData: any[];

  constructor() {
  }

  reload(): void {
    this.day = this.simulation!.simulationLength;
    this.lineAllChartData = [
      {
        "name": "Pi",
        "series": this.simulation!.days!.map((x, index) => {
          return {
            "name": index + 1,
            "value": x.infected
          }
        })
      },
      {
        "name": "Pv",
        "series": this.simulation!.days!.map((x, index) => {
          return {
            "name": index + 1,
            "value": x.healthy
          }
        })
      },
      {
        "name": "Pm",
        "series": this.simulation!.days!.map((x, index) => {
          return {
            "name": index + 1,
            "value": x.dead
          }
        })
      },
      {
        "name": "Pr",
        "series": this.simulation!.days!.map((x, index) => {
          return {
            "name": index + 1,
            "value": x.recovered
          }
        })
      }
    ];
    this.lineDeadChartData = [
      {
        name: 'Nowe zgony',
        series: []
      }
    ];
    this.lineRecoveredChartData = [
      {
        name: 'Nowe wyzdrowienia',
        series: []
      }
    ];
    this.lineInfectionsChartData = [
      {
        name: 'Nowe zachorowania',
        series: this.simulation!.days!.map((day, index) => {
          if(index > 0)
          {
            const dead = day.dead - this.simulation!.days!.at(index - 1)!.dead;
            this.lineDeadChartData.at(0)!.series.push({
              name: index + 1,
              value: dead
            })
            const recovered = day.recovered - this.simulation!.days!.at(index - 1)!.recovered;
            this.lineRecoveredChartData.at(0)!.series.push({
              name: index + 1,
              value: recovered
            })
            return {
              name: index + 1,
              value: day.infected - this.simulation!.days!.at(index - 1)!.infected + dead + recovered
            }
          }
          this.lineDeadChartData.at(0)!.series.push({
            name: index + 1,
            value: day.dead
          })
          this.lineRecoveredChartData.at(0)!.series.push({
            name: index + 1,
            value: day.recovered
          })
          return {
            name: index + 1,
            value: index > 0 ? day.infected - this.simulation!.days!.at(index - 1)!.infected : day.infected
          }
        })
      }
    ];
  }

  ngOnInit(): void {
    this.reload();
  }
}
