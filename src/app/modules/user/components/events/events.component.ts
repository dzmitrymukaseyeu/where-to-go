import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResUserEventsDefinition } from '@app/shared/interfaces';
import { ApiService, UserService } from '@app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  isButtonVisible = false;
  subscribedEvents  = [];
  destroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    private userService: UserService,
  ) { }

  ngOnInit(): void { 
    this.apiService.getUserEvents({email:this.userService.userData$.value.email})
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((res: ResUserEventsDefinition) => {
      this.subscribedEvents = res.content.eventsToVisit;
      console.log(res.content.eventsToVisit);
    })
  }

  onClickDelete(id: string){
    this.subscribedEvents = this.subscribedEvents.filter(event => event.id !== id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  } 
}
