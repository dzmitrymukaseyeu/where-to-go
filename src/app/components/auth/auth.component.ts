import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  UserService,
  ApiService,
  ToastsService,
  ModalService
} from '@app/services';
import { ResDefinition, ResUserDefinition } from '@app/shared/interfaces'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  signInForm: FormGroup;
  signIn = false;
  destroy$ = new Subject();
  text:string = 'Зарегистрироваться';
  @Output() close = new EventEmitter<boolean>();
  @Output() showUser = new EventEmitter<boolean>();
 
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private apiService: ApiService,
    private toastsService: ToastsService,
    private modalService: ModalService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open');

    this.signUpForm = this.formBuilder.group({
      firstName: [null, [
        Validators.required,
        Validators.pattern(/^[а-яё -]+$/i)
      ]],
      lastName: [null, [
        Validators.required,
        Validators.pattern(/^[а-яё -]+$/i)
      ]],
      email: [null, [
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]]
    })

    this.signInForm = this.formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]]
    })
  }

  onSignUpSubmit(event: Event) {
    event.preventDefault();
    const userInfo = this.signUpForm.value;
    this.apiService.signUp(userInfo)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((res:ResDefinition) => {
        this.toastsService.show(res.code, res.message);
        this.modalService.modalData$.next(false);
      },
      ({error}: { error: {
        code: number,
        message: string
      }}) => {
        this.toastsService.show(error.code, error.message);       
      })

    if(!this.signUpForm.valid) {
      return;
    }
  }

  onSingUpShow(event: Event) {
    this.text = this.signIn ? 'Зарегистрироваться' : 'У меня уже есть аккаунт';
    this.signIn = !this.signIn;
    
  }

  onSignInSubmit(event: Event) {
    event.preventDefault();
    const userSignInValue = this.signInForm.value;
    if(!this.signInForm.valid) {
      return;
    }
    this.apiService.signIn(userSignInValue)
      .pipe(
        takeUntil(this.destroy$)          
      )
      .subscribe((res:ResUserDefinition) => {
        this.userService.userData$.next(res.content);
        this.modalService.modalData$.next(false);
        localStorage.setItem( "userEmail", res.content.email)
      },
      ({error}: { error: {
        code: number,
        message: string
      }}) => {
        this.toastsService.show(error.code, error.message);       
      })
  }

  onCloseAuth(event: Event) {
    this.modalService.modalData$.next(false);    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.renderer.removeClass(document.body, 'modal-open');
  }

}
