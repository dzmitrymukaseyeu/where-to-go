import { Component, OnInit } from '@angular/core';
import { ToastsService } from '@app/services';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  constructor(
    public toastsService: ToastsService
  ) {}

  ngOnInit(): void {
    this.toastsService.toastsMessageData
    .subscribe(res => {
      console.log(res)
    },
    err => {
      console.log(err)
    })
  }

}
