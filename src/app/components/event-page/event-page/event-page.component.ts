import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, UserService } from '@app/services';
import {
  ResEventPageDefinition,
  EventsAllDefinition,
  UserDefinition 
} from '@app/shared/interfaces';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, OnDestroy {
  id: string;
  event: EventsAllDefinition = null;
  private destroy$ = new Subject();
  doIGo = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) { 
    this.id = this.activatedRoute.snapshot.params['id'];
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
  };

  imagesTable={
    'Кино': 'assets/cinema.jpg',
    'Концерты': 'assets/concert.jpg',
    'Фестивали': 'assets/festival.jpg',
    'Вечеринки': 'assets/party.jpg',
    'Спектакли': 'assets/show.jpg',
    'Выставки': 'assets/insert.jpg',
    'Другое': 'assets/other.jpg',
    'Активности': 'assets/active.jpg'
  };

  ngOnInit(): void {
    combineLatest([
      this.apiService.getEventById({ id: this.id}),
      this.userService.userData$
    ])
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe( ([res, userData]:[ResEventPageDefinition, UserDefinition]) => {
      this.event = res.content;
      this.doIGo = userData
        ? userData.eventsToVisit.includes(res.content.id)
        : false;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
