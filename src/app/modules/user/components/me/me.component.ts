import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/mocks';
import { UserDefinition } from '@app/shared/interfaces';
import { UserService } from '@app/services';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  User : UserDefinition[] = User;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {

    console.log(this.userService);
  }

}
