import { Component, OnInit } from '@angular/core';
import { UserService, ApiService } from '@app/services';
import { ResDefinition } from '@app/shared/interfaces'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isModalVisible = false;
  title = 'where-to-go';


  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');

    if (localStorage.getItem('userEmail') !== null) {
      this.apiService.getUser({email})
        .subscribe((res: ResDefinition) => {
          console.log(res);
          this.userService.userData= res.content;
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


}
