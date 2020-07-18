import { Component, OnInit } from '@angular/core';
import { EventsAll } from '@app/shared/mocks';
import { EventsAllDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  EventsAll : EventsAllDefinition[]  = EventsAll;

  constructor() { }

  ngOnInit(): void {

    console.log(EventsAll);

  }
}
