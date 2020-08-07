import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResUserEventsDefinition } from '@app/shared/interfaces';
import { ApiService, UserService } from '@app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-created-events',
  templateUrl: './created-events.component.html',
  styleUrls: ['./created-events.component.scss']
})

export class CreatedEventsComponent implements OnInit, OnDestroy {
  isButtonVisible = false;
  createdEvents  = [];
  private destroy$ = new Subject();

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
      this.createdEvents = res.content.createdEvents;
      console.log(res.content.createdEvents);
    }) 
  }

  onClickDelete(id: string){
    this.createdEvents = this.createdEvents.filter(event => event.id !== id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
