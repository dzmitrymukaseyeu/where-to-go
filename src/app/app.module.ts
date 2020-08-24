import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { EventRoutingModule } from './modules/event/event-routing.module';
import { AboutComponent } from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component'
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ToastsComponent } from './components/toasts/toasts/toasts.component';
import { EventPageComponent } from './components/event-page/event-page/event-page.component';
import { PreloaderComponent } from './components/preloader/preloader/preloader.component';

registerLocaleData(localeRu, 'ru');
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    AuthComponent,
    ToastsComponent,
    EventPageComponent,
    PreloaderComponent,
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
    SharedModule,
    MatInputModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
