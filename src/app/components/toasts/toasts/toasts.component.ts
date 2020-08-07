import { Component, OnInit, OnDestroy} from '@angular/core';
import { ToastsService } from '@app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  constructor(
    public toastsService: ToastsService
  ) {}

  ngOnInit(): void {
    this.toastsService.toastsMessageData
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(res => {
      console.log(res)
    },
    err => {
      console.log(err)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
