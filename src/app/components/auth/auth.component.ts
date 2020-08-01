import { Component, OnInit, Output, EventEmitter, OnDestroy, Renderer2} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, ApiService, ToastsService } from '@app/services';
import { finalize } from 'rxjs/operators'
import { pipe } from 'rxjs';
import { ResDefinition } from '@app/shared/interfaces'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  signInForm: FormGroup;
  signIn = false;
  @Output() close = new EventEmitter<boolean>();
  @Output() showUser = new EventEmitter<boolean>();

  text:string = 'Зарегистрироваться';
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private apiService: ApiService,
    private toastsService: ToastsService,
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

    console.log(1);
  }


  onSignUpSubmit(event: Event) {
    event.preventDefault();
    const userInfo = this.signUpForm.value;
    this.apiService.signUp(userInfo)
      .pipe(
        finalize(() => {

        })
      )
      .subscribe((res:ResDefinition) => {
        this.toastsService.show(res.code, res.message);
        this.close.emit(true);
      },
      ({error}: { error: {
        code: number,
        message: string
      }}) => {
        console.log(error);
        this.toastsService.show(error.code, error.message);       
      } )



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
        finalize(() => {

        })
      )
      .subscribe((res:ResDefinition) => {
        // this.toastsService.show(res.code, res.message);
        this.userService.userData$.next(res.content);
        this.showUser.emit(true);
        console.log(res);
        localStorage.setItem( "userEmail", res.content.email)
      },
      ({error}: { error: {
        code: number,
        message: string
      }}) => {
        console.log(error);
        this.toastsService.show(error.code, error.message);       
      })
  }

  onCloseAuth(event: Event) {
    this.close.emit(true);
    
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'modal-open');
  }

}
