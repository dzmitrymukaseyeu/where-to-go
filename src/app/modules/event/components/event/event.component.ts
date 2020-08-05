import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, UserService, ToastsService } from '@app/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResEventsDefinition } from '@app/shared/interfaces'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

export class EventComponent implements OnInit, OnDestroy {
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
  private destroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastsService: ToastsService,
    private router: Router,
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
          Validators.maxLength(250)
      ]],
      
      date:[null, [
        Validators.required
      ]],
      
      time: [null, [
        Validators.required
      ]],

      type:[this.eventsTypeList[0]],
    })
    
  }
  onEventSubmit(event: Event){
    event.preventDefault();
    if(!this.creationEventForm.valid){
      return;
    }

    const formValue = {
      ...this.creationEventForm.value
    }

    delete formValue.time;

    const newEvent = {
      ...formValue,
      bgImage: this.imagesTable[this.creationEventForm.value.type],
      userEmail: this.userService.userData$.value.email,
      date: `${this.creationEventForm.value.date}T${this.creationEventForm.value.time}`
    }

    this.apiService.createEvent(newEvent)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((res: ResEventsDefinition) => {
      this.toastsService.show(res.code, res.message);
      this.router.navigate(['/']);
    },
    ({error}: { error: {
      code: number,
      message: string
    }}) => {
      this.toastsService.show(error.code, error.message);       
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  
}






