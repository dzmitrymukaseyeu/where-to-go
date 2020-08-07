import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {


  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
