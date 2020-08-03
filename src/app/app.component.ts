import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, ApiService } from '@app/services';
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
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');

    if (localStorage.getItem('userEmail') !== null) {
      this.apiService.getUser({email})
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((res: ResUserDefinition) => {
          console.log(res);
          this.userService.userData$.next(res.content);
        })
    }
  }

  onAuthUser(event:boolean) {
    this.isModalVisible = event;
    console.log(this.isModalVisible);
  }

  onAuthClose(event:boolean) {
    this.isModalVisible = !event;
  }

  
  onUserShow(event:boolean){
    this.isModalVisible = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
