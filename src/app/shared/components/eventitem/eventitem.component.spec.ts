import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventitemComponent } from './eventitem.component';

describe('EventitemComponent', () => {
  let component: EventitemComponent;
  let fixture: ComponentFixture<EventitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
