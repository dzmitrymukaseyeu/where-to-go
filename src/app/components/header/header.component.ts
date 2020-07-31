import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { UserService } from '@app/services'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn = false;
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
    this.userService.userData = null;
    localStorage.removeItem('userEmail')
    this.isLoggedIn = false;
    console.log(this.userService.userData);
  }

}


