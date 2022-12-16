/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as fromApp from '@app/app.state';
import { Process } from '@registerMd/process';
import { Store } from '@ngrx/store';
import { RegisterService } from '@registerS/register.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  /**
   * @description Property that will receive
   * the process object from the store
   * @access public
   * @property {Process | undefined} processData
   */
  public processData!: Process | undefined;

  /**
   * @description
   * @access public
   * @property {boolean} isRegisterFinished
   */
  public isRegisterFinished!: boolean;

  /**
   * @description
   * @access public
   * @return Observable<Process | undefined>
   * @method   public processData: Observable<Process | undefined> =
   */
  public processData$: Observable<Process | undefined> = this._registerService
    .getProcessDataStored()
    .pipe(
      tap(process => {
        console.log(process);
        this.processData = process;
        if (
          process &&
          process?.hasPersonal &&
          process.hasSupplementary &&
          process.hasEcclesiastical
        ) {
          this.isRegisterFinished = true;
        } else {
          this.isRegisterFinished = false;
        }
      })
    );

  constructor(
    private readonly _store: Store<fromApp.AppState>,
    private readonly _registerService: RegisterService
  ) {}
}
