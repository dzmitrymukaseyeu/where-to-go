import { Component, OnInit } from '@angular/core';
import { EventsAll } from '@app/shared/mocks';
import { EventsAllDefinition } from '@app/shared/interfaces';
import { User } from '@app/shared/mocks';
import { UserDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-created-events',
  templateUrl: './created-events.component.html',
  styleUrls: ['./created-events.component.scss']
})
export class CreatedEventsComponent implements OnInit {
  userCreatedEvents: EventsAllDefinition[] = [];
  EventsAll : EventsAllDefinition[]  = EventsAll;
  User : UserDefinition[] = User;

  constructor() { }

  ngOnInit(): void {

    const userCreatedEvents = this.User[0].createdEventsId;
    this.userCreatedEvents = this.EventsAll.filter(evet => userCreatedEvents.includes(evet.id))
    console.log(this.userCreatedEvents);
  }

}
