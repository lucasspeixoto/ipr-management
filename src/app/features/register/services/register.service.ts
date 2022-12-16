import { Injectable } from '@angular/core';
import { DateService } from '@app/shared/services/date/date.service';
import { Store } from '@ngrx/store';
import * as fromApp from '@app/app.state';
import { Personal } from '@registerMd/personal';
import {
  setHasEcclesiastical,
  setHasPersonal,
  setHasSupplementary,
  updateEcclesiastical,
  updatePersonal,
  updateSupplementary,
} from '@registerSt/register/register.actions';
import { Supplementary } from '@registerMd/supplementary';
import { Ecclesiastical } from '@registerMd/ecclesiastical';
import {
  getEcclesiastical,
  getPersonal,
  getProcess,
  getSupplementary,
} from '../store/register/register.selectors';
import { combineLatest, Observable } from 'rxjs';
import { CombinedUserData } from '../models/user-data';
import {
  baptismOptions,
  communitiesOption,
  craftOptions,
  interestsOption,
  maritalOptions,
  membershipOptions,
  schoolingOptions,
  sexOptions,
} from '@app/config/constants/form-options';
import { Process } from '../models/process';
@Injectable()
export class RegisterService {
  /**
   * @description
   * Personal Observable object that will get from
   * store
   * @access public
   * @property {Observable<Personal>} personalData$
   */
  public personalData$ = this._store.select(getPersonal);

  /**
   * @description
   * Supplementary Observable object that will get from
   * store
   * @access public
   * @property {Observable<Supplementary>} supplementaryData$
   */
  public supplementaryData$ = this._store.select(getSupplementary);

  /**
   * @description
   * Ecclesiastical Observable object that will get from
   * store
   * @access public
   * @property {Observable<Ecclesiastical>} ecclesiasticalData$
   */
  public ecclesiasticalData$ = this._store.select(getEcclesiastical);

  /**
   * @description
   * Personal Observable object that will get from
   * store
   * @access public
   * @property {Observable<Process>} processData$
   */
  public processData$ = this._store.select(getProcess);

  /**
   * @access public
   * @description
   * Array with the sex form options
   * @property {Select} sexOptions
   */
  public readonly sexOptions = sexOptions;

  /**
   * @access public
   * @description
   * Array with the marital form options
   * @property {Select} maritalOptions
   */
  public readonly maritalOptions = maritalOptions;

  /**
   * @access public
   * @description
   * Array with the schooling form options
   * @property {Select} schoolingOptions
   */
  public readonly schoolingOptions = schoolingOptions;

  /**
   * @access public
   * @description
   * Array with the membership form options
   * @property {Select} membershipOptions
   */
  public readonly membershipOptions = membershipOptions;

  /**
   * @access public
   * @description
   * Array with the communities form options
   * @property {Select} communitiesOption
   */
  public readonly communitiesOption = communitiesOption;

  /**
   * @access public
   * @description
   * Array with the craft form options
   * @property {Select} craftOptions
   */
  public readonly craftOptions = craftOptions;

  /**
   * @access public
   * @description
   * Array with the interests form options
   * @property {Select} interestsOption
   */
  public readonly interestsOption = interestsOption;

  /**
   * @access public
   * @description
   * Array with the baptism form options
   * @property {Select} baptismOptions
   */
  public readonly baptismOptions = baptismOptions;

  constructor(
    private readonly _store: Store<fromApp.AppState>,
    private readonly _dateService: DateService
  ) {}

  /**
   * @description
   * @access public
   * @return Observable<Personal | undefined>
   * @method getPersonalDataStored
   */
  public getPersonalDataStored(): Observable<Personal | undefined> {
    return this.personalData$;
  }

  /**
   * @description
   * @access public
   * @return Observable<Supplementary | undefined>
   * @method getPersonalDataStored
   */
  public getSupplementaryDataStored(): Observable<Supplementary | undefined> {
    return this.supplementaryData$;
  }

  /**
   * @description
   * @access public
   * @return Observable<Ecclesiastical | undefined>
   * @method getEcclesiasticalDataStored
   */
  public getEcclesiasticalDataStored(): Observable<Ecclesiastical | undefined> {
    return this.ecclesiasticalData$;
  }

  /**
   * @description
   * @access public
   * @return Observable<Process | undefined>
   * @method getProcessDataStored
   */
  public getProcessDataStored(): Observable<Process | undefined> {
    return this.processData$;
  }

  /**
   * @description
   * @access public
   * @return void
   * @method sendPersonalDataHandler
   */
  public getUserDataStored(): CombinedUserData {
    return combineLatest([this.personalData$, this.supplementaryData$, this.ecclesiasticalData$]);
  }

  /**
   * @description Method for format birth_date for
   * firebase and get the personalForm data and
   * dispatch the updatePersonal action that will
   * update in the base the personal data
   * @access public
   * @return void
   * @method sendPersonalDataHandler
   */
  public sendPersonalDataHandler(personalData: Partial<Personal>, userId: string): void {
    const { birth_date } = personalData;
    const newPersonalData: Partial<Personal> = {
      ...personalData,
      birth_date: this._dateService.formatDate(new Date(birth_date!)),
    };

    this._store.dispatch(updatePersonal({ payload: newPersonalData, userId }));
  }

  /**
   * @description
   * @access public
   * @param {Process} process
   * @param {string} userId
   * @return void
   * @method sendHasPersonalHandler
   */
  public sendHasPersonalHandler(process: Process | undefined, userId: string): void {
    this._store.dispatch(setHasPersonal({ payload: { process, userId } }));
  }

  /**
   * @description
   * @access public
   * @param {Process} process
   * @param {string} userId
   * @return void
   * @method sendHasSupplementaryHandler
   */
  public sendHasSupplementaryHandler(process: Process | undefined, userId: string): void {
    this._store.dispatch(setHasSupplementary({ payload: { process, userId } }));
  }

  /**
   * @description
   * @access public
   * @param {Process} process
   * @param {string} userId
   * @return void
   * @method sendHasSupplementaryHandler
   */
  public sendHasEcclesiasticalHandler(process: Process | undefined, userId: string): void {
    this._store.dispatch(setHasEcclesiastical({ payload: { process, userId } }));
  }

  /**
   * @description Method for format wedding_date for
   * firebase and get the supplementaryForm data and
   * dispatch the updateSupplementary action that will
   * update in the base the supplementary data
   * @access public
   * @param {Partial<Supplementary>} supplementaryData
   * @param {string} userId
   * @return void
   * @method sendSupplementaryDataHandler
   */
  public sendSupplementaryDataHandler(
    supplementaryData: Partial<Supplementary>,
    userId: string
  ): void {
    const { wedding_date } = supplementaryData;
    const newSupplementaryData: Partial<Supplementary> = {
      ...supplementaryData,
      wedding_date: this._dateService.formatDate(new Date(wedding_date!)),
    };

    this._store.dispatch(updateSupplementary({ payload: newSupplementaryData, userId }));
  }

  /**
   * @description Method for format baptism_date for
   * firebase and get the ecclesiasticalForm data and
   * dispatch the updateEcclesiastical action that will
   * update in the base the ecclesiastical data
   * @access public
   * @return void
   * @method sendEcclesiasticalDataHandler
   */
  public sendEcclesiasticalDataHandler(
    ecclesiasticalData: Partial<Ecclesiastical>,
    userId: string
  ): void {
    const { baptism_date } = ecclesiasticalData;
    const newEcclesiasticalData: Partial<Ecclesiastical> = {
      ...ecclesiasticalData,
      baptism_date: this._dateService.formatDate(new Date(baptism_date!)),
    };

    this._store.dispatch(updateEcclesiastical({ payload: newEcclesiasticalData, userId }));
  }
}
