import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services';
import { ResEventPageDefinition, EventsAllDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
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
    'Кино': '/assets/cinema.jpg)',
    'Концерты': 'url(/assets/concert.jpg)',
    'Фестивали': 'assets/festival.jpg',
    'Вечеринки': 'url(/assets/party.jpg)',
    'Спектакли': 'url(/assets/show.jpg)',
    'Выставки': 'url(/assets/insert.jpg)',
    'Другое': 'url(/assets/other.jpg)',
    'Активности': 'url(/assets/active.jpg)'
  };

  ngOnInit(): void {
    this.apiService.getEventById({ id: this.id})
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe ( (res: ResEventPageDefinition ) => { this.event = res.content; 
    console.log(this.event.visitors) })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
