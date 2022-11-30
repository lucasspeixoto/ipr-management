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
  public hide = true;

  public loginForm = this._formBuilder.group({ ...loginForm });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<fromApp.AppState>
  ) {}

  /**
   * @name userLoginHandler
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
