import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule, MatFormFieldModule, MatIconModule, MatCommonModule,
        MatInputModule, MatButtonModule, MatAutocompleteModule, MatSelectModule, MatTableModule, 
        MatPaginatorModule} from '@angular/material';
import { AppComponent } from './app.component';
import {FlightSearchComponent} from './flight/flight-search.component';
import {FlightsListComponent} from './flight/flight-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AppService} from './shared/app.service';
import { RouterModule } from '@angular/router';
import {appRoutes} from './routes';

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent,
    FlightsListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
