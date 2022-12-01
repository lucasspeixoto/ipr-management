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
   * @access public
   * @description
   * Variable for control the user password
   * visibility, show if false and hide with true
   * @property {boolean} hidePassword
   *
   */
  public hidePassword = true;

  /**
   * @access public
   * @description
   * Variable with the page title string passed
   * as input in the app-authentication-layout
   * component
   * @property {string} title
   *
   */
  public readonly title = 'Cadastro';

  /**
   * @access public
   * @description
   * FormBuilder instance form create signup form
   * with name, email and password
   * @property {FormGroup} signupForm
   *
   */
  public readonly signupForm = this._formBuilder.group({ ...signUpForm });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<fromApp.AppState>
  ) {}

  /**
   * @access public
   * @description
   * User signup handler for get user data (name, email and password)
   * from form and and dispatch the Signup action with user payload
   * @method userSignUpHandler
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
   * @access public
   * @description
   * User login with google handler for dispatch
   * the LoginWithGoogle action
   * @method loginWithGoogleHandler
   * @return void
   *
   */
  public loginWithGoogleHandler(): void {
    this._store.dispatch(AuthActions.LoginWithGoogle());
  }
}
