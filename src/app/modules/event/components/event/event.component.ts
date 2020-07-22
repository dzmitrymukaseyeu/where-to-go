import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services';

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

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // const user = {
    //     firstName: 'Коля',
    //     lastName: 'Лукашов',
    //     email: 'batyamoi@ya.ru',
    //     password: 'fdkffdf'
    // }

    // this.apiService.signUp(user)
    //   .subscribe(res => console.log(res));


    //  const obj = {
    //   type: "Кино",
    //   date: "2015-01-24T21:23",
    //   title: "Кто в кино?",
    //   description: "Кто со мной на Темный рыцарь",
    //   userEmail: "batyamoi@ya.ru",
    //   bgImage: 'dsdsdsds'
    // }

    // this.apiService.createEvent(obj)
    //   .subscribe(res => console.log(res))
  }

}
