import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@authMd/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public readonly afs: AngularFirestore,
    public readonly afAuth: AngularFireAuth,
    public readonly router: Router,
    public readonly ngZone: NgZone
  ) {}

  public isAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => user != null));
  }

  public getNewUser(user: User, name: string): User {
    const { email, photoURL, userId, emailVerified } = user;

    return {
      email,
      photoURL,
      userId,
      name,
      emailVerified,
    };
  }
}
