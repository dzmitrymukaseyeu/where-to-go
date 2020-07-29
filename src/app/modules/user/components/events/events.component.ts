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
  isButtonVisible = false;
  // colorsTable = {
  //   'Кино': "#FF7100",
  //   'Концерты': "#E40045",
  //   'Фестивали': "#A1A500",
  //   'Вечеринки': "#6949D7",
  //   'Спектакли': "#009999",
  //   'Выставки': "#FF4E40",
  //   'Другое': "#35C0CD",
  //   'Активности': "#4AA329",
  // }
  // imagesTable={
  //   'Кино': 'url(/assets/cinema.jpg)',
  //   'Концерты': 'url(/assets/concert.jpg)',
  //   'Фестивали': 'url(/assets/festival.jpg)',
  //   'Вечеринки': 'url(/assets/party.jpg)',
  //   'Спектакли': 'url(/assets/show.jpg)',
  //   'Выставки': 'url(/assets/insert.jpg)',
  //   'Другое': 'url(/assets/other.jpg)',
  //   'Активности': 'url(/assets/active.jpg)'
  // };
  
 
  constructor() { }

  ngOnInit(): void { 
    const userEvents = this.User[0].subscriedEventsId;
    this.userEvents = this.EventsAll.filter(events => userEvents.includes(events.id))
    console.log(this.userEvents); 
  }

  
}
