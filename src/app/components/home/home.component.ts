import { Component, OnInit, Input } from '@angular/core';
import { EventsAllDefinition, ResEventsDefinition } from '@app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @Input () isButtonVisible: boolean;

  eventsAll : EventsAllDefinition[] = [];
  filteredEvents = new BehaviorSubject([]);
  constructor(
    private apiService: ApiService
  ) {}

  typeOfEvents = [
    'Кино',
    'Концерты',
    'Фестивали',
    'Вечеринки',
    'Спектакли',
    'Выставки',
    'Другое',
    'Активности',
  ];

  ngOnInit(): void {
    this.apiService.getAllEvents()
      .subscribe((res: ResEventsDefinition) => {
        this.eventsAll = res.content;
        this.filteredEvents.next(res.content);
      })
  }

  OnFilterClick(event: string) {
    const filteredEvents = this.eventsAll.filter(item => item.type === event); 
    
    this.filteredEvents.next(filteredEvents);
  }
}
