import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromApp from '@app/app.state';

import { ForgotPassword } from '@authSt/auth.actions';
import { forgotPasswordForm } from '@constants/auth-forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  /**
   * @name loginForm
   * @description
   * forgotPasswordForm instance form create loginForm form
   * with email
   * @access public
   *
   */
  public readonly forgotPasswordForm = this._formBuilder.group({
    ...forgotPasswordForm,
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<fromApp.AppState>
  ) {}

  /**
   * @name forgotPasswordHandler
   * @description
   * User forgot Password handler for get user data (email)
   * from form and and dispatch the ForgotPassword action with user payload
   * @params None
   * @access public
   * @return void
   *
   */
  public forgotPasswordHandler(): void {
    const { email } = this.forgotPasswordForm.value;
    this._store.dispatch(ForgotPassword({ payload: email! }));
  }
}
