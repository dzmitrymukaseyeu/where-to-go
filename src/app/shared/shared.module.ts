import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventitemComponent } from './components/eventitem/eventitem.component';
import { RouterModule  } from '@angular/router';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

@NgModule({
  declarations: [
    EventitemComponent,
    PlaceholderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    EventitemComponent,
    PlaceholderComponent
  ]
})
export class SharedModule { }
