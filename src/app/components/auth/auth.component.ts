import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/services';
import { ApiService } from '@app/services';


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
   

  text:string = 'У меня уже есть аккаунт';
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private apiService: ApiService
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
      .subscribe(res => console.log(res))



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

    if(!this.signInForm.valid) {
      return;
    }
    console.log(this.signInForm.value);
    this.showUser.emit(true);
  }

  onCloseAuth(event: Event) {
    this.close.emit(true);
    
  }

}
