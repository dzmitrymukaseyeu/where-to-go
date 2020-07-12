import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { MeComponent } from './components/me/me.component';
import { EventsComponent } from './components/events/events.component';

const routes: Routes = [
  {
    path: '',
    component: UserContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'me'
      },
      {
        path: 'me',
        component: MeComponent
      },
      {
        path: 'events',
        component: EventsComponent        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
