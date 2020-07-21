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
  colorsTable = {
    'Кино': "#FF7100",
    'Концерты': "#E40045",
    'Фестивали': "#A1A500",
    'Вечеринки': "#6949D7",
    'Спектакли': "#009999",
    'Выставки': "#FF4E40",
    'Другое': "#35C0CD",
    'Активности': "#2DD700",
  }
 
  constructor() { }

  ngOnInit(): void {
    
    const userEvents = this.User[0].subscriedEventsId;
    this.userEvents = this.EventsAll.filter(events => userEvents.includes(events.id))
    console.log(this.userEvents); 
  }

  
}
