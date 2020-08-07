import { Component, OnInit } from '@angular/core';
import { UserService, ModalService } from '@app/services';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService,
    public modalService: ModalService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  onShowNav($event: Event) {
    const navMenu = document.querySelector('.b-nav');
    console.log(navMenu);
    navMenu.classList.add('_open');
  }

  onCloseNav($event) {
    const navMenu = document.querySelector('.b-nav');

    if($event.target.classList.contains('b-nav')){
        navMenu.classList.remove('_open');
      }
  }
  
  onBtnCloseNav(): void {
    const navMenu = document.querySelector('.b-nav');
    navMenu.classList.remove('_open');
  }  
  

  onCreateEvent() {
    if (!localStorage.getItem('userEmail')) {
      this.modalService.modalData$.next(true);
    }
  }

  OnAuthClick() {
    this.modalService.modalData$.next(true);
  }

  onLogOut() {
    this.userService.userData$.next(null);
    localStorage.removeItem('userEmail')
    this.router.navigate(['/']);

  }
}


