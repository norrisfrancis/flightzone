import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import { config } from './../../config'

@Injectable()
export class FlightSearchService {

	constructor(private http: Http) { }

	//Pipe function for executing a series of functions. - Todo move to a helper class
	pipe(...funcs) {
		return funcs.reduce((previousFn, currentFn) => (...args) => currentFn(previousFn(...args)))
	}

	//Get flights form API and return and observable/
	getFlights(payload) {
		// ...using get request
		return this.http.post(config.API_URL(), payload)
			// ...and calling .json() on the response to return data
			.map((res: Response) => res.json())
			//...errors if any
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	//Parse Flight Data for search page
	parseFlightData(data): any {
		let flightOptions = data.tripOption.map((x) => {
			return this.pipe(this.setId, this.getPrices, this.createDepartureObject.bind(this), this.createReturnObject.bind(this), this.removeOriginalData)({data: x, supportInfo: data.data});
		});
		return flightOptions;
	}

	//Get prices for trip
	getPrices(obj) {
		obj.pricing = {
			saleFareTotal: obj.data.pricing[0].saleFareTotal,
			saleTax: obj.data.pricing[0].saleTaxTotal,
			saleTotal: obj.data.pricing[0].saleTotal
		}
		return obj;
	}

	//Get the flight ID
	setId(obj) {
		obj.id = obj.data.id;
		return obj;
	}

	//Parse data returned for departure or return and convert to a trip object for displaying.
	createFlightDetails(obj, index, type) {
		obj[type].flightNumber = obj.data.slice[index].segment[0].flight.number || null;
		obj[type].carrierCode = obj.data.slice[index].segment[0].flight.carrier || null;
		obj[type].cabin = obj.data.slice[index].segment[0].cabin || null;
		obj[type].departureDateTime = obj.data.slice[index].segment[0].leg[0].arrivalTime || null;
		obj[type].origin = obj.data.slice[index].segment[0].leg[0].origin || null;
		obj[type].destination = obj.data.slice[index].segment[0].leg[0].destination || null;
		obj[type].duration = obj.data.slice[index].duration || null;
		obj[type].mealOptions = obj.data.slice[index].segment[0].leg[0].meal || 'N/A';
		obj[type].carrier = this.getSupportInfo(obj.supportInfo.carrier, obj[type].carrierCode);
		obj[type].airport = this.getSupportInfo(obj.supportInfo.airport, obj[type].origin);
		obj[type].departureCity = this.getSupportInfo(obj.supportInfo.city, obj[type].origin);
		obj[type].departureDate = moment(obj[type].departureDateTime).format('MMMM Do YYYY');
		obj[type].departureTime = moment(obj[type].departureDateTime).format('h:mm:ss a');
		obj[type].flightTime = this.timeConvert(obj[type].duration);
		obj[type].connection = (obj.data.slice[index].segment.length > 1) ? true : false;
		obj[type].connections = ((obj.data.slice[index].segment.length + 1) - 2);
		return obj;
	}

	//Create Departure Object
	createDepartureObject(obj) {
		obj.departure = {};
		return this.createFlightDetails(obj, 0, 'departure')
	}

	//Create Return Object
	createReturnObject(obj, y) {
		obj.return = {};
		return this.createFlightDetails(obj, 1, 'return')
	}

	//Get supporting information for flights - used to return a flights city, airports, or carrier information
	getSupportInfo (data, match, type?) {
		return data.filter((o,i) => {
			return o.code === match;
		})[0];
	}

	//Removed the original data object.
	removeOriginalData(obj) {
		if (typeof obj !== 'undefined' && typeof obj.data !== 'undefined') {
			delete obj.data
		}
		return obj;
	}

	//Format time for display
	timeConvert(n) {
		var num = n;
		var hours = (num / 60);
		var rhours = Math.floor(hours);
		var minutes = (hours - rhours) * 60;
		var rminutes = Math.round(minutes);
		return rhours + " hour(s) and " + rminutes + " minute(s).";
	}
}
