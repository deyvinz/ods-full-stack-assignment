import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import {AppService} from '../shared/app.service';
import {IStation} from '../shared/flights.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  // selector: 'app-root',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightSearchComponent implements OnInit {
  myControl = new FormControl();
  private options: IStation[];
  title = 'delta-flights';
  filteredOptions: Observable<IStation[]>;
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.options = JSON.parse(sessionStorage.getItem('stations'));
    if ( this.options === null) {
      this.appService.getStations()
      .subscribe((data: IStation[]) => {
        this.options = data;
        this.getFilteredOptions();
      },
      (err: any) => console.log(err),
      () => console.log('done getting stations'));
    } else {
      this.getFilteredOptions();
    }
  }
  getFilteredOptions() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice()),
    );
  }

  displayFn(station?: IStation): string | undefined {
    return station ? station.name : undefined;
  }
  private _filter(name: string): IStation[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getFlights(url, station) {
    const fullUrl = `${url}/${station.name}`;
    this.router.navigateByUrl(fullUrl).then(e => {
      if (e) {
        console.log('Successfully routed');
      } else {
        console.log('Failed routing');
      }
    });

  }
}
