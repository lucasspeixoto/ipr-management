/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import {
  baptismOptions,
  communitiesOption,
  craftOptions,
  interestsOption,
  maritalOptions,
  membershipOptions,
  schoolingOptions,
  sexOptions,
} from '@constants/form-options';

import { Subject, takeUntil } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromApp from '@app/app.state';

import { getUserUid } from '@authSt/auth.selectors';

import { Personal } from '@registerMd/personal';
import {
  getEcclesiastical,
  getPersonal,
  getSupplementary,
} from '@registerSt/register/register.selectors';
import {
  updateEcclesiastical,
  updatePersonal,
  updateSupplementary,
} from '@registerSt/register/register.actions';

import { getDateFromString } from '@sharedH/date.helper';
import { DateService } from '@sharedS/date/date.service';
import { GetAddressService } from '@sharedS/get-address/get-address.service';
import {
  ecclesiasticalValidators,
  personalValidators,
  supplementaryValidators,
} from '../../helpers/validators';
import { Supplementary } from '../../models/supplementary';
import { Ecclesiastical } from '../../models/ecclesiastical';
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
export class RegisterComponent implements OnInit, OnDestroy {
  /**
   * @name destroy$
   * @description
   * Subject for the control in getAddress subscribe
   * with takeUntil operator
   * @access public
   * @type Subject<boolean>
   *
   */
  private readonly destroy$: Subject<boolean> = new Subject();

  /**
   * @property {string} userId
   * @description
   * userId string for handler user steps data
   * @access public
   *
   */
  public userId!: string;

  /**
   * @property {Observable<string>} userId$
   * @description
   * userId observable for get userId from store in
   * pipe async subscribe
   * @access public
   *
   */
  public readonly userId$ = this._store
    .select(getUserUid)
    .pipe(tap(uid => (this.userId = uid!)));

  public personalData!: Personal;
  public personalData$ = this._store.select(getPersonal).pipe(
    takeUntil(this.destroy$),
    tap(personal => {
      this.personalDataHandler(personal);
    })
  );

  public supplementaryData!: Supplementary;
  public supplementaryData$ = this._store.select(getSupplementary).pipe(
    takeUntil(this.destroy$),
    tap(supplementary => {
      this.supplementaryDataHandler(supplementary);
    })
  );

  public ecclesiasticalData!: Ecclesiastical;
  public ecclesiasticalData$ = this._store.select(getEcclesiastical).pipe(
    takeUntil(this.destroy$),
    tap(ecclesiastical => {
      this.ecclesiasticalDataHandler(ecclesiastical);
    })
  );

  /**
   * @property {FormGroup} personalForm
   * @description FormGroup for manage personal
   * datas inputs and validators
   * @access public
   *
   */
  public personalForm: FormGroup = this._formBuilder.group({
    ...personalValidators,
  });

  /**
   * @property {FormGroup} supplementaryForm
   * @description FormGroup for manage supplementarys
   * datas inputs and validators
   * @access public
   *
   */
  public supplementaryForm: FormGroup = this._formBuilder.group({
    ...supplementaryValidators,
  });

  /**
   * @property {FormGroup} supplementaryForm
   * @description FormGroup for manage supplementarys
   * datas inputs and validators
   * @access public
   *
   */
  public ecclesiasticalForm: FormGroup = this._formBuilder.group({
    ...ecclesiasticalValidators,
  });

  //************ Options */
  /**
   * @name sexOptions
   * @description
   * Array with the sex form options
   * Masculino or Feminino
   * @access public
   *
   */
  public readonly sexOptions = sexOptions;

  /**
   * @name maritalOptions
   * @description
   * Array with the marital status form options
   * @access public
   *
   */
  public readonly maritalOptions = maritalOptions;

  /**
   * @name schoolingOptions
   * @description
   * Array with the schooling status form options
   * @access public
   *
   */
  public readonly schoolingOptions = schoolingOptions;

  /**
   * @name membershipOptions
   * @description
   * Array with the member ship form options
   * @access public
   *
   */
  public readonly membershipOptions = membershipOptions;

  /**
   * @name communitiesOption
   * @description
   * Array with the member ship form options
   * @access public
   *
   */
  public readonly communitiesOption = communitiesOption;

  /**
   * @name craftOptions
   * @description
   * Array with the craft form options
   * @access public
   *
   */
  public readonly craftOptions = craftOptions;

  /**
   * @name interestsOption
   * @description
   * Array with the nterests form options
   * @access public
   *
   */
  public readonly interestsOption = interestsOption;

  /**
   * @name baptismOptions
   * @description
   * Array with the nterests form options
   * @access public
   *
   */
  public readonly baptismOptions = baptismOptions;

  constructor(
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _getAddressService: GetAddressService,
    private readonly _store: Store<fromApp.AppState>,
    private readonly _dateService: DateService
  ) {}

  /**
   * @method ngOnInit
   * @description
   *
   * @access public
   * @return void
   *
   */
  public ngOnInit(): void {
    this.getAddressDataHandler();
  }

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
      this.personalData = personal;
      const birth_date = new Date(getDateFromString(personal.birth_date));
      this.personalForm.setValue({
        ...this.personalData,
        birth_date,
      });
    }
  }

  /**
   * @method supplementaryDataHandler
   * @description Method for get the personal data
   * from store, if exists and update the personalForm
   * @param {Personal | undefined} supplementary
   * @access public
   * @return void
   *
   */
  public supplementaryDataHandler(supplementary: Supplementary | undefined): void {
    if (supplementary) {
      this.supplementaryData = supplementary;
      const wedding_date = new Date(getDateFromString(supplementary.wedding_date));
      this.supplementaryForm.setValue({
        ...this.supplementaryData,
        wedding_date,
      });
    }
  }

  /**
   * @method supplementaryDataHandler
   * @description Method for get the personal data
   * from store, if exists and update the personalForm
   * @param {Personal | undefined} supplementary
   * @access public
   * @return void
   *
   */
  public ecclesiasticalDataHandler(ecclesiastical: Ecclesiastical | undefined): void {
    if (ecclesiastical) {
      this.ecclesiasticalData = ecclesiastical;
      const baptism_date = new Date(getDateFromString(ecclesiastical.baptism_date));
      this.ecclesiasticalForm.setValue({
        ...this.ecclesiasticalData,
        baptism_date,
      });
    }
  }

  public sendPersonalDataHandler(): void {
    const personalData = this.personalForm.value as Partial<Personal>;
    const { birth_date } = personalData;
    const newPersonalData: Partial<Personal> = {
      ...personalData,
      birth_date: this._dateService.formatDate(new Date(birth_date!)),
    };
    if (this.personalForm.valid) {
      this._store.dispatch(
        updatePersonal({
          payload: newPersonalData,
          userId: this.userId,
        })
      );
    }
  }

  public sendSupplementaryDataHandler(): void {
    const supplementaryData = this.supplementaryForm.value as Partial<Supplementary>;
    const { wedding_date } = supplementaryData;
    const newSupplementaryData: Partial<Supplementary> = {
      ...supplementaryData,
      wedding_date: this._dateService.formatDate(new Date(wedding_date!)),
    };
    if (this.supplementaryForm.valid) {
      this._store.dispatch(
        updateSupplementary({
          payload: newSupplementaryData,
          userId: this.userId,
        })
      );
    }
  }

  public sendEcclesiasticalDataHandler(): void {
    const ecclesiasticalData = this.ecclesiasticalForm.value as Partial<Ecclesiastical>;
    const { baptism_date } = ecclesiasticalData;
    const newEcclesiasticalData: Partial<Ecclesiastical> = {
      ...ecclesiasticalData,
      baptism_date: this._dateService.formatDate(new Date(baptism_date!)),
    };
    if (this.ecclesiasticalForm.valid) {
      this._store.dispatch(
        updateEcclesiastical({
          payload: newEcclesiasticalData,
          userId: this.userId,
        })
      );
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
