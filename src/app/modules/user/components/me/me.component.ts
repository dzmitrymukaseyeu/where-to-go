import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/mocks';
import { UserDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  User : UserDefinition[] = User;

  constructor() { }

  ngOnInit(): void {
  }

}
