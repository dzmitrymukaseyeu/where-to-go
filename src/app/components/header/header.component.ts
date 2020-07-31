import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { UserService } from '@app/services'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() authOn = new EventEmitter<boolean>();

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  OnAuthClick(event:Event) {
    this.authOn.emit(true);
  }

  onLogOut(event:Event) {
    this.userService.userData$.next(null);
    localStorage.removeItem('userEmail')
    console.log(this.userService.userData$.value);
  }

}


