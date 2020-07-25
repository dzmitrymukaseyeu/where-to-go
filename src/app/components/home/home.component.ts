import { Component, OnInit } from '@angular/core';
import { EventsAll } from '@app/shared/mocks';
import { EventsAllDefinition } from '@app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  EventsAll : EventsAllDefinition[] = EventsAll;
  filteredEvents = new BehaviorSubject(this.EventsAll);
  constructor(
    private apiService: ApiService
  ) {
    
   }
  colorsTable = {
    'Кино': "#FF7100",
    'Концерты': "#E40045",
    'Фестивали': "#A1A500",
    'Вечеринки': "#6949D7",
    'Спектакли': "#009999",
    'Выставки': "#FF4E40",
    'Другое': "#35C0CD",
    'Активности': "#4AA329",
  }

  imagesTable={
    'Кино': 'url(/assets/cinema.jpg)',
    'Концерты': 'url(/assets/concert.jpg)',
    'Фестивали': 'url(/assets/festival.jpg)',
    'Вечеринки': 'url(/assets/party.jpg)',
    'Спектакли': 'url(/assets/show.jpg)',
    'Выставки': 'url(/assets/insert.jpg)',
    'Другое': 'url(/assets/other.jpg)',
    'Активности': 'url(/assets/active.jpg)'
  };

  ngOnInit(): void {

    this.apiService.getAllEvents()
      .subscribe(res => console.log(res)); 
      console.log(EventsAll);
  }

  OnFilterClick(event) {
    console.log(event);
    const filteredEvents = this.EventsAll.filter(item => item.type === event.srcElement.innerText); 
    
    this.filteredEvents.next(filteredEvents);
  }
}
