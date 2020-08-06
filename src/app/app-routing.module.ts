import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { EventPageComponent } from './components/event-page/event-page/event-page.component';
import { FaqComponent } from './components/faq/faq.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'event',
    loadChildren: () => import('./modules/event/event.module').then(m => m.EventModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'item/:id', 
    component: EventPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }