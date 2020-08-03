import { Component, OnInit } from '@angular/core';
import { ResUserEventsDefinition } from '@app/shared/interfaces';
import { ApiService, UserService } from '@app/services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  isButtonVisible = false;
  subscribedEvents  = [];
 
  
 
  constructor(
    private apiService: ApiService,
    private userService: UserService,
  ) { }

  ngOnInit(): void { 
    this.apiService.getUserEvents({email:this.userService.userData$.value.email})
    .subscribe((res: ResUserEventsDefinition) => {
      this.subscribedEvents = res.content.eventsToVisit;
      console.log(res.content.eventsToVisit);
    })
  }

  
}
