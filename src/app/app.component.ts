import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isModalVisible = false;
  isLoggedIn = false;
  title = 'where-to-go';

  onAuthUser(event:boolean) {
    this.isModalVisible = event;
    console.log(this.isModalVisible);
  }

  onAuthClose(event:boolean) {
    this.isModalVisible = !event;
  }


}
