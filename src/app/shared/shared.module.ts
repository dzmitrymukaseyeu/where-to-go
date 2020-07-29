import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventitemComponent } from './components/eventitem/eventitem.component';

@NgModule({
  declarations: [
    EventitemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventitemComponent
  ]
})
export class SharedModule { }
