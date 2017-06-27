import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'flight-block',
	templateUrl: './flight-block.component.html',
	styleUrls: ['./flight-block.component.css']
})
export class FlightBlockComponent implements OnInit {
	@Input() flight: any = {};
	constructor() { }

	ngOnInit() {
		console.log(this)
	}

}
