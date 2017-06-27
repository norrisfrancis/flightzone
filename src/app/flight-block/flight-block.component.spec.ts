import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBlockComponent } from './flight-block.component';

describe('FlightBlockComponent', () => {
  let component: FlightBlockComponent;
  let fixture: ComponentFixture<FlightBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
