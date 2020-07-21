import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  imagesTable={
    'Кино': "/assets/cinema.jpg",
    'Концерты': "/assets/concert.jpg",
    'Фестивали': "/assets/festival.jpg",
    'Вечеринки': "/assets/party.jpg",
    'Спектакли': "/assets/show.jpg",
    'Выставки': "/assets/insert.jpg",
    'Другое': "/assets/other.jpg",
    'Активности': "/assets/active.jpg"
  } 

  constructor() { }

  ngOnInit(): void {
  }

}
