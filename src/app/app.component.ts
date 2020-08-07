import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, ApiService, ModalService } from '@app/services';
import { ResUserDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  isModalVisible = false;
  title = 'where-to-go';
  private destroy$ = new Subject();

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private modalService: ModalService
  ) { }


  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');

    if (localStorage.getItem('userEmail') !== null) {
      this.apiService.getUser({email})
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((res: ResUserDefinition) => this.userService.userData$.next(res.content));
    }

    this.modalService.modalData$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => this.isModalVisible = res)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
