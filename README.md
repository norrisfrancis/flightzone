# FlightZone
###Welcome to FlightZone, a simple tool that allows users to find round trip flights available based on inputted critera

To get the project running.

Install the dependancies
`npm install`

Start the server.

`ng serve --open`

This project uses the [google QPX express API](https://developers.google.com/qpx-express/) to request flight information, go to [google developer console](https://console.developers.google.com/) to create an API KEY

`Add your API key to the config file found in the main directory (config.ts)`

##Todo:

- proper variable typing,
- better connection flight information
- proper pagination
- currency / cost formatting.
- create utility function file

##Angular CLI info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
