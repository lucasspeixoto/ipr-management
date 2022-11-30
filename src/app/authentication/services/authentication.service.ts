import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public readonly afs: AngularFirestore,
    public readonly _angularFireAuth: AngularFireAuth,
    public readonly router: Router,
    public readonly ngZone: NgZone
  ) {}

  public isAuth(): Observable<boolean> {
    return this._angularFireAuth.authState.pipe(map(user => user != null));
  }
}
