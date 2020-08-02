import { Component, OnInit, Input } from '@angular/core';
import { EventsAll } from '@app/shared/mocks';
import { EventsAllDefinition, ResEventsDefinition } from '@app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @Input () isButtonVisible: boolean;

  eventsAll : EventsAllDefinition[] = [];
  filteredEvents = new BehaviorSubject(this.eventsAll);
  constructor(
    private apiService: ApiService
  ) {}
 

  ngOnInit(): void {

    this.apiService.getAllEvents()
      .subscribe((res: ResEventsDefinition)=> {
        this.eventsAll = res.content;
        console.log(this.eventsAll)}); 
  }

  OnFilterClick(event) {
    console.log(event);
    const filteredEvents = this.eventsAll.filter(item => item.type === event.srcElement.innerText); 
    
    this.filteredEvents.next(filteredEvents);
  }
}
