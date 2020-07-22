import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authUser = false;

  isLoggedIn = false;


  title = 'where-to-go';

  onAuthUser(event:boolean) {
    this.authUser = event;
    console.log(this.authUser);
  }
}
