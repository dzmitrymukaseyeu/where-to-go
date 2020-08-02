import { Component, OnInit, Input } from '@angular/core';
import { ApiService, UserService } from '@app/services';
import { EventsAll } from '@app/shared/mocks';

@Component({
  selector: 'app-eventitem',
  templateUrl: './eventitem.component.html',
  styleUrls: ['./eventitem.component.scss']
})
export class EventitemComponent implements OnInit {

@Input() event;
@Input() isButtonVisible = true;

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
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  onGoToEvent(event: Event) {
    console.log(this.event.id, this.userService.userData$.value.email )
    this.apiService.goToEvent({
      id: this.event.id,
      email: this.userService.userData$.value.email 
    })
      .subscribe(res => console.log(res))
  }

}
