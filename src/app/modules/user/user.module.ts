import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MeComponent } from './components/me/me.component';
import { EventsComponent } from './components/events/events.component';
import { UserContainerComponent } from './containers/user-container/user-container.component';


@NgModule({
  declarations: [
    MeComponent,
    EventsComponent,
    UserContainerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
