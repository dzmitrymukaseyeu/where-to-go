import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { MeComponent } from './components/me/me.component';
import { EventsComponent } from './components/events/events.component';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { CreatedEventsComponent } from './components/created-events/created-events.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MeComponent,
    EventsComponent,
    UserContainerComponent,
    CreatedEventsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    SharedModule
  ]
})
export class UserModule { }
