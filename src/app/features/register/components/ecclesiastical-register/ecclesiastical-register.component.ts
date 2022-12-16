/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { RegisterService } from '@registerS/register.service';
import { Ecclesiastical } from '@registerMd/ecclesiastical';
import { Process } from '@registerMd/process';

import { getDateFromString } from '@sharedH/date.helper';

@Component({
  selector: 'app-ecclesiastical-register',
  templateUrl: './ecclesiastical-register.component.html',
  styleUrls: ['./ecclesiastical-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcclesiasticalRegisterComponent implements OnDestroy {
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
   * @property {FormGroup} ecclesiasticalForm
   * @description FormGroup for manage ecclesiastical
   * datas inputs and validators
   * @access public
   */
  @Input()
  public ecclesiasticalForm!: FormGroup;

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
   * userDataStored Observable array that will get from
   * store personal, supplementary and ecclesiastical
   * data, combined with combineLatest Rxjs operator in
   * an array
   * @access public
   * @property {Observable<Ecclesiastical | undefined>} personalData$
   */
  public ecclesiascticalData$ = this._registerService.getEcclesiasticalDataStored().pipe(
    takeUntil(this.destroy$),
    tap(ecclesiastical => {
      this.ecclesiasticalDataHandler(ecclesiastical);
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

  constructor(public readonly _registerService: RegisterService) {}

  /**
   * @method ecclesiasticalDataHandler
   * @description Method for get the ecclesiastical data
   * from store, if exists and update the ecclesiasticalForm
   * @param {Ecclesiastical | undefined} ecclesiastical
   * @access public
   * @return void
   *
   */
  public ecclesiasticalDataHandler(ecclesiastical: Ecclesiastical | undefined): void {
    if (ecclesiastical) {
      const baptism_date = new Date(getDateFromString(ecclesiastical.baptism_date));
      this.ecclesiasticalForm.setValue({
        ...ecclesiastical,
        baptism_date,
      });
    }
  }

  /**
   * @description Method that checks if the personalForm
   * form is valid and will call the sendPersonalDataHandler
   * service from RegisterService with the form data and the userId
   * @access public
   * @return void
   * @method sendEcclesiasticalData
   */
  public sendEcclesiasticalData(): void {
    if (this.ecclesiasticalForm.valid) {
      const ecclesiasticalData = this.ecclesiasticalForm.value as Partial<Ecclesiastical>;
      this._registerService.sendEcclesiasticalDataHandler(ecclesiasticalData, this.userId);
      this._registerService.sendHasEcclesiasticalHandler(this.processData, this.userId);
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
