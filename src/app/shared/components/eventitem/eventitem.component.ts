import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    console.log(1);
  }

}
