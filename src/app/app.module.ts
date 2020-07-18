import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { EventRoutingModule } from './modules/event/event-routing.module';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FaqComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserRoutingModule,
    AuthRoutingModule,
    EventRoutingModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
