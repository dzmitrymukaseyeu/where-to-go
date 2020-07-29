import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn = false;
  @Output() authOn = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  OnAuthClick(event:Event) {
    this.authOn.emit(true);
  }

}


