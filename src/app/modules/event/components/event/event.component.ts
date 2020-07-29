import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
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
  eventsTypeList: string[] = Object.keys(this.imagesTable);

  creationEventForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.creationEventForm = this.formBuilder.group({
      title: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30)
      ]],
      description: [null, [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(100)
      ]],
      
      date:[null, [
        Validators.required
      ]],
      
      time: [null, [
        Validators.required
      ]],

      type:[this.eventsTypeList[0]],
    })

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
  onEventSubmit(event: Event){
    event.preventDefault();
    if(!this.creationEventForm.valid){
      return;
    }

    const newEvent = this.creationEventForm.value;
    this.apiService.createEvent(newEvent)
    .subscribe(res => console.log(res))
    //console.log(this.creationEventForm.value); 

    const obj = {
      ...this.creationEventForm.value,
      bgImage: this.imagesTable[this.creationEventForm.value.type]
    }
    console.log("obj:", obj )
  
  }

  
}






