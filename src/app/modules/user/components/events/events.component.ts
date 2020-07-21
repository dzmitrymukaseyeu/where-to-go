import { Component, OnInit } from '@angular/core';
import { EventsAll } from '@app/shared/mocks';
import { EventsAllDefinition } from '@app/shared/interfaces';
import { User } from '@app/shared/mocks';
import { UserDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  userEvents: EventsAllDefinition[] = [];
  EventsAll : EventsAllDefinition[]  = EventsAll;
  User : UserDefinition[] = User;
 
  constructor() { }

  ngOnInit(): void {
    
    const userEvents = this.User[0].subscriEventsId;
    this.userEvents = this.EventsAll.filter(evets => userEvents.includes(evets.id))
    console.log(this.userEvents);
  }

  
}
