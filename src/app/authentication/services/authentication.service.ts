import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { FirebaseUser } from '../models/firebase-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public readonly _angularFireAuth: AngularFireAuth) {}

  /**
   * @access public
   * @description Check in the firebase authState if the user
   * is logged or not, returning a observable of boolean
   * @method isAuth
   * @returns {Observable<boolean>}
   */
  public isAuth(): Observable<FirebaseUser> {
    return this._angularFireAuth.authState;
  }
}
