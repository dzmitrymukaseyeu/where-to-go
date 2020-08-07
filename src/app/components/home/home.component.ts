import { Component, OnInit, Input } from '@angular/core';
import { EventsAllDefinition, ResEventsDefinition } from '@app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators'
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
    const preloader = document.querySelector('.b-main__preloader');
    preloader.classList.add('_loading');

    this.apiService.getAllEvents()
      .pipe(
        finalize(() =>  preloader.classList.remove('_loading'))
      )
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
