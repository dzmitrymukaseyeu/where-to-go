import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { ApiService, ToastsService, UserService, ModalService } from '@app/services';
import { ResUserEventsDefinition, EventsAllDefinition, UserDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-eventitem',
  templateUrl: './eventitem.component.html',
  styleUrls: ['./eventitem.component.scss']
})
export class EventitemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() event: EventsAllDefinition;
  @Input() isButtonVisible = true;
  @Input() userData: UserDefinition = null;
  @Input() canDelete = false;
  @Output() eventDelete = new EventEmitter<string>() 
  private destroy$ = new Subject();
  doIGo = false;

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

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private toastsService: ToastsService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes): void {
    const userData = changes.userData
      ? changes.userData.currentValue
      : null;

    this.doIGo = userData
      ? this.userData.eventsToVisit.includes(this.event.id)
      : false; 
  }

  onGoToEvent(id: string) {
    if (!this.userData) {
      return this.modalService.modalData$.next(true);
    }

    this.apiService.goToEvent({
      id,
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

  onDeleteEvent(id: string) {
    if(confirm("Удалить?") === true){
      this.apiService.deleteEvent({
        id: id,
        userEmail: this.userData.email 
      })
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          (res:ResUserEventsDefinition) => {
            this.eventDelete.emit(id)
          },
          ({error}: { error: {
            code: number,
            message: string
          }}) => this.toastsService.show(error.code, error.message)       
        )
    }   
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
