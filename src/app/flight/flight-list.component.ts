import { Component, ViewChild, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, tap, switchMap, map, startWith, takeUntil} from 'rxjs/operators';
import {AppService} from '../shared/app.service';
import {IFlight} from '../shared/flights.model';
import {IStation} from '../shared/flights.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  template: `<div class="dataTable">
  <div class= "mat-elevation-z8">
  <mat-form-field class="filterForm">
  <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
  </mat-form-field>
    <table mat-table [dataSource] = "dataSource">
        <!-- Position Column -->
        <ng-container matColumnDef="Id">
          <th mat-header-cell *matHeaderCellDef> Id </th>
          <td mat-cell *matCellDef="let flight"> {{flight.id}} </td>
        </ng-container>
        <ng-container matColumnDef="Origin">
          <th mat-header-cell *matHeaderCellDef> Origin </th>
          <td mat-cell *matCellDef="let flight"> {{flight.origin}}</td>
        </ng-container>
        <ng-container matColumnDef="Destination">
           <th mat-header-cell *matHeaderCellDef> Destination </th>
           <td mat-cell *matCellDef="let flight"> {{flight.destination}}</td>
        </ng-container>
            <ng-container matColumnDef="Scheduled Origin Gate">
            <th mat-header-cell *matHeaderCellDef> Scheduled Origin Gate </th>
            <td mat-cell *matCellDef="let flight"> {{flight.scheduled_origin_gate}} </td>
        </ng-container>
        <ng-container matColumnDef="Scheduled Destination Gate">
           <th mat-header-cell *matHeaderCellDef> Scheduled Destination Gate </th>
           <td mat-cell *matCellDef="let flight"> {{flight.scheduled_destination_gate}} </td>
        </ng-container>
        <ng-container matColumnDef="Flight Number">
            <th mat-header-cell *matHeaderCellDef>Flight Number </th>
            <td mat-cell *matCellDef="let flight"> {{flight.flt_num }} </td>
        </ng-container>
        <ng-container matColumnDef="GMT-OUT">
            <th mat-header-cell *matHeaderCellDef>GMT-OUT</th>
            <td mat-cell *matCellDef="let flight"> {{flight.out_gmt}} </td>
        </ng-container>

        <ng-container matColumnDef="GMT-IN">
              <th mat-header-cell *matHeaderCellDef>GMT-IN</th>
              <td mat-cell *matCellDef="let flight"> {{flight.in_gmt}} </td>
        </ng-container>


        <ng-container matColumnDef="GMT-ON">
            <th mat-header-cell *matHeaderCellDef>GMT-ON</th>
            <td mat-cell *matCellDef="let flight"> {{flight.on_gmt}} </td>
        </ng-container>
        <ng-container matColumnDef="GMT-OFF">
            <th mat-header-cell *matHeaderCellDef>GMT-OFF</th>
            <td mat-cell *matCellDef="let flight"> {{flight.off_gmt}} </td>
        </ng-container>
        <ng-container matColumnDef="Date Created">
            <th mat-header-cell *matHeaderCellDef>Date Created</th>
            <td mat-cell *matCellDef="let flight"> {{flight.created_at}} </td>
        </ng-container>
        <ng-container matColumnDef="Last Updated">
            <th mat-header-cell *matHeaderCellDef>Last Updated</th>
            <td mat-cell *matCellDef="let flight"> {{flight.updated_at}} </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
  </div>`,
  styleUrls: ['./flight.component.css']
})

export class FlightsListComponent implements OnInit {
  flights: IFlight[];
  displayedColumns: string[] = [
    'Id',
    'Origin',
    'Destination',
    'Scheduled Origin Gate',
    'Scheduled Destination Gate',
    'Flight Number',
    'GMT-OUT',
    'GMT-IN',
    'GMT-ON',
    'GMT-OFF',
    'Date Created',
    'Last Updated'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<IFlight>(this.flights);
  constructor(private appService: AppService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.appService.getFlightsByStation(this.route.snapshot.params[`station`]).subscribe((data: IFlight[]) => {
      this.flights = data;
      this.dataSource = new MatTableDataSource<IFlight>(this.flights);
      this.dataSource.paginator = this.paginator;
      console.log(this.flights);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
