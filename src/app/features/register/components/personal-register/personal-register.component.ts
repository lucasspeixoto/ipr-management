/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromApp from '@app/app.state';

import { getUser } from '@authSt/auth.selectors';

import { Personal } from '@registerMd/personal';
import { Process } from '@registerMd/process';
import { RegisterService } from '@registerS/register.service';

import { getDateFromString } from '@sharedH/date.helper';
import { GetAddressService } from '@sharedS/get-address/get-address.service';

@Component({
  selector: 'app-personal-register',
  templateUrl: './personal-register.component.html',
  styleUrls: ['./personal-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalRegisterComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Subject for the control in subscribes
   * with takeUntil operator
   * @access private
   * @property {Subject<unknown>} destroy$
   *
   */
  private readonly destroy$ = new Subject();

  /**
   * @property {FormGroup} personalForm
   * @description FormGroup for manage personal
   * datas inputs and validators
   * @access public
   */
  @Input()
  public personalForm!: FormGroup;

  /**
   * @description
   * userId string for handler user steps data
   * @access public
   * @property {string} userId
   */
  @Input()
  public userId!: string;

  /**
   * @description
   * userId string for handler user steps data
   * @access public
   * @property {Observable<Partial<User>>} user$
   */
  public readonly user$ = this._store.select(getUser).pipe(
    tap(user => {
      this.personalForm.patchValue({
        email: user?.email,
      });
    })
  );

  /**
   * @description
   * userDataStored Observable array that will get from
   * store personal, supplementary and ecclesiastical
   * data, combined with combineLatest Rxjs operator in
   * an array
   * @access public
   * @property {Observable<Personal | undefined>} personalData$
   */
  public personalData$ = this._registerService.getPersonalDataStored().pipe(
    takeUntil(this.destroy$),
    tap(personal => {
      this.personalDataHandler(personal);
    })
  );

  /**
   * @description
   * @access public
   * @property {Process | undefined} processData
   */
  public processData: Process | undefined;

  /**
   * @description
   * @access public
   * @property {Observable<Process | undefined>} processData$
   */
  public processData$: Observable<Process | undefined> = this._registerService
    .getProcessDataStored()
    .pipe(
      tap(processData => {
        if (processData) this.processData = processData;
      })
    );

  constructor(
    private readonly _getAddressService: GetAddressService,
    public readonly _registerService: RegisterService,
    private readonly _store: Store<fromApp.AppState>
  ) {}

  /**
   * @access public
   * @return {void}
   * @method ngOnInit
   */
  public ngOnInit(): void {
    this.getAddressDataHandler();
  }

  /**
   * @access public
   * @description Method to be called in the blur event of
   * the cep field that will call the viaCep service and
   * return the complete address and populate the form
   * @return {void}
   * @method getAddressDataHandler
   */
  public getAddressDataHandler(): void {
    const cepControl = this.personalForm.controls['cep'];
    const cep = this.personalForm.get('cep')!.value!;
    if (cepControl.valid) {
      this._getAddressService
        .getAddressData(cep)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.personalForm.patchValue({
            state: data.uf,
            city: data.localidade,
            address: data.logradouro,
            district: data.bairro,
          });
        });
    }
  }

  /**
   * @method personalDataHandler
   * @description Method for get the personal data
   * from store, if exists and update the personalForm
   * @param {Personal | undefined} personal
   * @access public
   * @return void
   *
   */
  public personalDataHandler(personal: Personal | undefined): void {
    if (personal) {
      const birth_date = new Date(getDateFromString(personal.birth_date));
      this.personalForm.setValue({
        ...personal,
        birth_date,
      });
    }
  }

  /**
   * @description Method that checks if the personalForm
   * form is valid and will call the sendPersonalDataHandler
   * service from RegisterService with the form data and the userId
   * @access public
   * @return void
   * @method sendPersonalData
   */
  public sendPersonalData(): void {
    if (this.personalForm.valid) {
      const personalData = this.personalForm.value as Partial<Personal>;
      this._registerService.sendPersonalDataHandler(personalData, this.userId);
      this._registerService.sendHasPersonalHandler(this.processData, this.userId);
    }
  }

  /**
   * @access public
   * @return {void}
   * @method ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
