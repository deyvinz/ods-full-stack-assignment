import {Routes} from '@angular/router';
import {FlightsListComponent} from './flight/flight-list.component';
import {FlightSearchComponent} from './flight/flight-search.component';
import {AppComponent} from './app.component';

export const appRoutes: Routes = [
  {path: 'search', component: FlightSearchComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/:station', component: FlightsListComponent}
];

