import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@app/services';


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

  text:string = 'У меня уже есть аккаунт';
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      login: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]],
      email: [null, [
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      firstName: [null, [
        Validators.required,
        Validators.pattern(/^[а-яё -]+$/i)
      ]],
      lastName: [null, [
        Validators.required,
        Validators.pattern(/^[а-яё -]+$/i)
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

    if(!this.signUpForm.valid) {
      return;
    }
    console.log(this.signUpForm.value);
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
  }

  onCloseAuth(event: Event) {
    this.close.emit(true);
    
  }

}
