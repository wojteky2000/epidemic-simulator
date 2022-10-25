import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimulationsListComponent} from './components/simulations-list/simulations-list.component';
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {MatDividerModule} from "@angular/material/divider";
import {
  SimulationsListElementComponent
} from './components/simulations-list/simulations-list-element/simulations-list-element.component';
import {SimulationDetailsComponent} from './components/simulation-details/simulation-details.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { ChartsControllerComponent } from './components/simulation-details/charts-controller/charts-controller.component';
import {FormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { SimulationFormComponent } from './components/simulation-form/simulation-form.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    SimulationsListComponent,
    PageNotFoundComponent,
    SimulationsListElementComponent,
    SimulationDetailsComponent,
    ChartsControllerComponent,
    SimulationFormComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatListModule,
        MatDividerModule,
        MatGridListModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTabsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatSliderModule,
        NgxChartsModule,
        MatStepperModule,
        MatCardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
