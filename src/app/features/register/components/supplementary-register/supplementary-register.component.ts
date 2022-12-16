/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getDateFromString } from '@sharedH/date.helper';

import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { Supplementary } from '@registerMd/supplementary';
import { RegisterService } from '@registerS/register.service';
import { Process } from '@registerMd/process';

@Component({
  selector: 'app-supplementary-register',
  templateUrl: './supplementary-register.component.html',
  styleUrls: ['./supplementary-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplementaryRegisterComponent implements OnDestroy {
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
   * @property {FormGroup} supplementaryForm
   * @description FormGroup for manage supplementary
   * datas inputs and validators
   * @access public
   */
  @Input()
  public supplementaryForm!: FormGroup;

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
   * @property {Observable<Personal | undefined>} personalData$
   */
  public supplementaryData$ = this._registerService.getSupplementaryDataStored().pipe(
    takeUntil(this.destroy$),
    tap(supplementary => {
      this.supplementaryDataHandler(supplementary);
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
      const wedding_date = new Date(getDateFromString(supplementary.wedding_date));
      this.supplementaryForm.setValue({
        ...supplementary,
        wedding_date,
      });
    }
  }

  /**
   * @description Method that checks if the supplementaryForm
   * form is valid and will call the sendSupplementaryDataHandler
   * service from RegisterService with the form data and the userId
   * @access public
   * @return void
   * @method sendSupplementaryData
   */
  public sendSupplementaryData(): void {
    if (this.supplementaryForm.valid) {
      const supplementaryData = this.supplementaryForm.value as Partial<Supplementary>;
      this._registerService.sendSupplementaryDataHandler(supplementaryData, this.userId);
      this._registerService.sendHasSupplementaryHandler(this.processData, this.userId);
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
