import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FlightSearchService } from './flight-search.service';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  public searchForm: FormGroup; // our model driven form
  public flightData: any = [];
  public loading: boolean = false;
  public noResults: boolean = false;
  public limit: number = 20;
  public repsonseErrors = undefined;

  constructor(private SearchService: FlightSearchService, private _fb: FormBuilder) { }

  ngOnInit() {
    //initialize the form
    this.searchForm = this._fb.group({
      request: this._fb.group({
        passengers: this._fb.group({
          adultCount: [1],
          childCount: [0],
          infantInSeatCount: [0]
        }),
        departure: this._fb.group({
          origin: ['', <any>Validators.required],
          destination: ['', <any>Validators.required],
          date: [moment().format('YYYY-MM-DD'), <any>Validators.required],
          return: [(<any>moment()).add(7, 'days').format('YYYY-MM-DD'), <any>Validators.required]
        })
      })
    });
  }

  ngAfterViewInit() {
    //Set the events for the datepickers
    (<any>$('.dd, .ad')).datepicker({
      format: 'yyyy-mm-dd',
      startDate: "today"
    }).on('changeDate', (e) => {
      this.changeDate(e.target.name, e.format(e.dates))
    });
  }

  //returns an object to be used as either an origin or destination slice object
  createDeparture(origin, destination, date): any {
    return {
      origin: origin,
      destination: destination,
      date: date
    };
  }

  //Applies the date selected in the datepicker
  changeDate(inputName, date): void {
    if (inputName === 'departure') {
      this.searchForm.patchValue({ request: { departure: { date: date } } });
    } else {
      this.searchForm.patchValue({ request: { return: { date: date } } });
    }
  }
  //Submits form if it is valid
  submitForm(value, valid): void {
    if (valid) {
      this.loading = true;
      this.searchFlights(this.formatData(value));
    }
  }

  //Formats the form data into the required payload for the API request
  formatData(data): any {
    return {
      request: {
        passengers: data.request.passengers,
        slice: [].concat(this.createDeparture(data.request.departure.origin, data.request.departure.destination, data.request.departure.date)).concat(this.createDeparture(data.request.departure.destination, data.request.departure.origin, data.request.departure.return))
      }
    }
  }

  //resets neccessary state based items
  resetData(): void {
    this.repsonseErrors = false;
    this.limit += 20;
    this.noResults = false;
  }

  //Request data from the API via search service and handles data.
  searchFlights = (payload): void => {
    this.resetData();
    this.flightData = [];
    this.SearchService.getFlights(payload)
      .subscribe(
      flights => {
        //If data is returned, format it for display.
        if (flights.trips.tripOption) {
          this.flightData = this.SearchService.parseFlightData(flights.trips);
        } else {
          this.noResults = true;
        }
        this.loading = false;
      },
      err => {
        this.repsonseErrors = this.parseError(err);
        this.loading = false;
      });
  }

  //Attempt to parse and display errors returned from the API
  parseError(err): string {
    let message: any;
    if (err.code === 400) {
      //handle input errors
      message = err.message.split('  ');
      message = message[message.length - 1];
      message = (message.indexOf('x.pax.adults') > -1) ? 'At least one adult or senior passenger must be specified.' : message;
      message = (message.indexOf(' x.slices[1].date') > -1) ? 'Invalid Date' : message;
      return message;
    } else if (err.code === 403) {
      //handle limit errors
      return 'Not authorized. If free daily quota is exceeded, sign up for billing or wait until next day. If rate limit is exceeded, send queries more slowly.';
    } else if (err.code === 503) {
      //handle server side errors
      return 'Temporary overload. Wait before retrying.';
    } else {
      return 'There was an error processing your request. Please contact a system administrator.';
    }
  }

  //Increase the limit of results(simulates a lazy load)
  moreResults(): void {
    this.limit += 20;
  }
}
