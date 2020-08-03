import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService, UserService, ToastsService } from '@app/services';
import { ResUserEventsDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-eventitem',
  templateUrl: './eventitem.component.html',
  styleUrls: ['./eventitem.component.scss']
})
export class EventitemComponent implements OnInit, OnDestroy {
@Input() event;
@Input() isButtonVisible = true;
private destroy$ = new Subject();

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
  ) { }

  ngOnInit(): void {
  }

  onGoToEvent(id: string) {
    this.apiService.goToEvent({
      id,
      email: this.userService.userData$.value.email 
    })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res:ResUserEventsDefinition) => this.toastsService.show(res.code, res.message),
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
