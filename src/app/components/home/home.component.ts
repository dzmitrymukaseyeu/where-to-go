import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EventsAllDefinition, ResEventsDefinition } from '@app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { ApiService } from '@app/services';
import { EventsAllDefinition, ResEventsDefinition, UserDefinition } from '@app/shared/interfaces';
import { ApiService, UserService } from '@app/services';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  eventsAll : EventsAllDefinition[] = [];
  filteredEvents = new BehaviorSubject([]);
  destroy$ = new Subject();
  userData: UserDefinition = null;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  typeOfEvents = [
    'Все события',
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
    this.userService.userData$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.userData = res;
        console.log(res);
      });


    this.apiService.getAllEvents()
      .pipe(
        finalize(() =>  preloader.classList.remove('_loading'))
        takeUntil(this.destroy$)
      )
      .subscribe((res: ResEventsDefinition) => {
        this.eventsAll = res.content;
        this.filteredEvents.next(res.content);
      })
  }

  OnFilterClick(event: string) {
    if (event === 'Все события') {
      const allEvents = this.eventsAll;
      this.filteredEvents.next(allEvents);
    } else {
    const filteredEvents = this.eventsAll.filter(item => item.type === event); 
    this.filteredEvents.next(filteredEvents);
    }
  }



  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}


