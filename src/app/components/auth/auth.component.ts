import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/services';
import { ApiService } from '@app/services';
import { ToastsService } from '@app/services';
import { finalize } from 'rxjs/operators'
import { pipe } from 'rxjs';
import { ResDefinition } from '@app/shared/interfaces'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  signUpForm: FormGroup;
  signInForm: FormGroup;
  signIn = false;
  @Output() close = new EventEmitter<boolean>();
  @Output() showUser = new EventEmitter<boolean>();
   
  res: ResDefinition;




  text:string = 'У меня уже есть аккаунт';
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private apiService: ApiService,
    private toastsService: ToastsService
  ) { }

  ngOnInit(): void {
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
    this.text = this.signIn ? 'У меня уже есть аккаунт' : 'Зарегистрироваться';
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
        this.toastsService.show(res.code, res.message);
        this.showUser.emit(true);
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

}
