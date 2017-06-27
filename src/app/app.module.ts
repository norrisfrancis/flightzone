import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Services
import { FlightSearchService } from './flight-search/flight-search.service';

//Components
import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightBlockComponent } from './flight-block/flight-block.component';
import { ArrayLimitPipe } from './pipes/array-limit.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent,
    FlightBlockComponent,
    ArrayLimitPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
  	FlightSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
