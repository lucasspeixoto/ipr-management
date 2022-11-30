import * as fromApp from '@app/app.state';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { signUpForm } from '@constants/auth-forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '@authSt/action-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  /**
   * @name hidePassword
   * @description
   * Variable for control the user password
   * visibility, show if false and hide with true
   * @access public
   *
   */
  public hidePassword = true;

  /**
   * @name title:
   * @description
   * Variable with the page title string passed
   * as input in the app-authentication-layout
   * component
   * @access public
   *
   */
  public readonly title = 'Cadastro';

  /**
   * @name signupForm
   * @description
   * FormBuilder instance form create signup form
   * with name, email and password
   * @access public
   *
   */
  public readonly signupForm = this._formBuilder.group({ ...signUpForm });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<fromApp.AppState>
  ) {}

  /**
   * @name userSignUpHandler
   * @description
   * User signup handler for get user data (name, email and password)
   * from form and and dispatch the Signup action with user payload
   * @params None
   * @access public
   * @return void
   *
   */
  public userSignUpHandler(): void {
    const { name, email, password } = this.signupForm.value;

    const user = {
      name: name!,
      email: email!,
      password: password!,
    };

    this._store.dispatch(AuthActions.Signup({ payload: user }));
  }

  /**
   * @name loginWithGoogleHandler
   * @description
   * User login with google handler for dispatch
   * the LoginWithGoogle action
   * @params None
   * @access public
   * @return void
   *
   */
  public loginWithGoogleHandler(): void {
    this._store.dispatch(AuthActions.LoginWithGoogle());
  }
}
