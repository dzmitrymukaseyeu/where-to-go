import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { EventRoutingModule } from './modules/event/event-routing.module';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component'
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { MatInputModule } from '@angular/material/input';
import { ToastsComponent } from './components/toasts/toasts/toasts.component';
import { EventitemComponent } from './shared/components/eventitem/eventitem.component';

=======
>>>>>>> 2d0fed3... Added shared module

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FaqComponent,
    HeaderComponent,
<<<<<<< HEAD
    AuthComponent,
    ToastsComponent,
    EventitemComponent
=======
    AuthComponent
>>>>>>> 2d0fed3... Added shared module
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserRoutingModule,
    EventRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
