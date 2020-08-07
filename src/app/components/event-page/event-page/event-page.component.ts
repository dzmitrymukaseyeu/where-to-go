import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, UserService, ModalService, ToastsService } from '@app/services';
import {
  ResEventPageDefinition,
  EventsAllDefinition,
  UserDefinition,
  ResUserEventsDefinition 
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
  userData: UserDefinition = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private modalService: ModalService,
    private toastsService: ToastsService
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
      this.userData = userData;
      this.doIGo = userData
        ? userData.eventsToVisit.includes(res.content.id)
        : false;
    })
  }

  onGoToEvent(id: string) {
    if (!this.userData) {
      return this.modalService.modalData$.next(true);
    }
    this.apiService.goToEvent({
      id: this.event.id,
      email: this.userData.email 
    })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res:ResUserEventsDefinition) => {
          this.toastsService.show(res.code, res.message);
          this.event.visitors.push(this.userData);
          this.doIGo = true;
        },
        ({error}: { error: {
          code: number,
          message: string
        }}) => this.toastsService.show(error.code, error.message)       
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
