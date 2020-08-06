import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventitemComponent } from './components/eventitem/eventitem.component';
import { RouterModule  } from '@angular/router';

@NgModule({
  declarations: [
    EventitemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    EventitemComponent
  ]
})
export class SharedModule { }
