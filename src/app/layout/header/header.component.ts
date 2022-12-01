import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '@app/app.state';

import { Logout } from '@authSt/auth.actions';

import { loadMessages } from '@sharedSt/message/message.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  /**
   * @access public
   * @description
   * Variable for control the user password
   * visibility, show if false and hide with true
   * @property {boolean} isMenuOpened
   *
   */
  @Input() public isMenuOpened!: boolean;

  /**
   * @access public
   * @description
   * Output with the information that sidebar is
   * showed or hiden
   * @property {EventEmitter<boolean>} isShowSidebar
   */
  @Output() public isShowSidebar = new EventEmitter<boolean>();

  constructor(private readonly _store: Store<fromApp.AppState>) {}

  /**
   * @access public
   * @description Initialise the form when component is constructed
   * @method ngOnInit
   */
  public ngOnInit(): void {
    this._store.dispatch(loadMessages());
  }

  /**
   * @access public
   * @description Method caller when the menu
   * is opened por closes. Change the isMenuOpened
   * property value and emit the event by isMenuOpened
   * event emitter
   * @method openMenu
   */
  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  /**
   * @access public
   * @description Dispatch the Logou action that
   * will logout firebase user and navigate the app
   * to the login page
   * @method signOut
   */
  public signOut(): void {
    this._store.dispatch(Logout());
  }
}
