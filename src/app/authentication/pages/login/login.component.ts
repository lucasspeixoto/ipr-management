import * as fromApp from '@app/app.state';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { loginForm } from '@constants/auth-forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/authentication/store/action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
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
   * @name loginForm
   * @description
   * FormBuilder instance form create loginForm form
   * with email and password
   * @access public
   *
   */
  public readonly loginForm = this._formBuilder.group({ ...loginForm });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<fromApp.AppState>
  ) {}

  /**
   * @method userLoginHandler
   * @description
   * User login handler for get user data (email and password)
   * from form and and dispatch the Login action with user payload
   * @params None
   * @access public
   * @return void
   *
   */
  public userLoginHandler(): void {
    const { email, password } = this.loginForm.value;

    const user = {
      email: email!,
      password: password!,
    };

    this._store.dispatch(AuthActions.Login({ payload: user }));
  }

  /**
   * @method loginWithGoogleHandler
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
