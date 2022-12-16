/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromApp from '@app/app.state';

import { getUserUid } from '@authSt/auth.selectors';

import {
  ecclesiasticalValidators,
  personalValidators,
  supplementaryValidators,
} from '@registerH/validators';

import { RegisterService } from '@registerS/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  /**
   * @description
   * userId string for handler user steps data
   * @access public
   * @property {string} userId
   */
  public userId!: string;

  /**
   * @description
   * userId observable for get userId from store in
   * pipe async subscribe
   * @access public
   * @property {Observable<string>} userId$
   */
  public readonly userId$ = this._store.select(getUserUid).pipe(tap(uid => (this.userId = uid!)));

  /**
   * @property {FormGroup} personalForm
   * @description FormGroup for manage personal
   * datas inputs and validators
   * @access public
   */
  public personalForm: FormGroup = this._formBuilder.group({
    ...personalValidators,
  });

  /**
   * @description FormGroup for manage supplementarys
   * datas inputs and validators
   * @access public
   * @property {FormGroup} supplementaryForm
   */
  public supplementaryForm: FormGroup = this._formBuilder.group({
    ...supplementaryValidators,
  });

  /**
   * @description FormGroup for manage supplementarys
   * datas inputs and validators
   * @access public
   * @property {FormGroup} supplementaryForm
   */
  public ecclesiasticalForm: FormGroup = this._formBuilder.group({
    ...ecclesiasticalValidators,
  });

  constructor(
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _store: Store<fromApp.AppState>,
    public readonly _registerService: RegisterService
  ) {}
}
