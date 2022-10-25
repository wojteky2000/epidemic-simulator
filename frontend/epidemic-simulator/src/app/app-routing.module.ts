import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimulationsListComponent} from "./components/simulations-list/simulations-list.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {SimulationDetailsComponent} from "./components/simulation-details/simulation-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/simulations', pathMatch: 'full' },
  { path: 'simulations', component: SimulationsListComponent },
  { path: 'simulations/:id', component: SimulationDetailsComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
