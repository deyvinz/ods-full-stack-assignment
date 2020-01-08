import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable } from 'rxjs';
import {retry, map, catchError} from 'rxjs/operators';
import {IFlight} from './flights.model';
import {IStation} from './flights.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private API_SERVER = 'http://127.0.0.1:5002';

  constructor(private httpClient: HttpClient) {}


  getStations(): Observable<IStation[]>  {
    return this.httpClient.get<IStation[]>(this.API_SERVER + '/stations').pipe(
      map((data: IStation[]) => {
        sessionStorage.setItem('stations', JSON.stringify(data));
        return data;
      }), retry(3));
  }

  getFlightsByStation(station: string): Observable<IFlight[]> {
    // const OPTIONS = {params: new HttpParams({fromString: '_page=1&_limit=20'})};
    return this.httpClient.get<IFlight[]>(this.API_SERVER + '/flights/' + station).pipe(
      map((data: IFlight[]) => {
        return data;
      }),
      retry(3));

  }
}
