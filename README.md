# ODS Full Stack Coding Assignment

## Assignment

Create a web application that allows a user to search for flights and display the results in a tabular view.

## Features

1. Allow the user to enter a station (destination or origin) to search flights. Display the results in a table.

2. Provide an auto-suggest feature for station.

3. Provide two RESTful endpoints supporting the functionality listed in steps 1 and 2.

## Datasource

A zipped CSV file of flights is available in /data/flights.csv. Each row in the CSV file represents a flight.

## Implementation

Use any technologies you want. If you are familiar with Python and/or Angular please use these for your app. You can use any additional technologies/frameworks/dbs/libraries you would like to.

To submit your solution, clone this repo and push to a personal github repo and submit the link.

Please update the README

Return your solution within 1 week - this is to provide a buffer for busy schedules.

Please ask any questions you have.


------------------------------------------------------------------------------------------------------------
-----------------------------SOLUTION-----------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------


## Framework & Technology used
Front end - Angular and Angular Material
Back end - API >>>>> Python 
          Database >>>> SQLite Database

API File: server.py
Database file: delta.db

## API Routes
Get stations for auto-suggest - http://127.0.0.1:5002/stations
Get Flights by station name - http://127.0.0.1:5002/flights/{station}

## UI Routes
shows the page that searches for flights -  http://localhost:4200/search 
shows  flights in a table - http://localhost:4200/search/{stattion}