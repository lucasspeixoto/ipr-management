import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromApp from '@app/app.state';

import { User } from '@authMd/user.model';

import { StartLoading, StopLoading } from '@sharedSt/loading/loading.actions';
import { Messages } from '@shared/messages/firebase';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';

import * as auth from 'firebase/auth';

import { AuthActions } from './action-types';
import { RegisterActions } from '@registerSt/register/action-types';
import { appRoutes } from '@config/routes/app-routes';
import { FirebaseAuthUserCredential } from '@authMd/firebase-auth-user-credential.model';
import { loadMemberData } from '@registerSt/register/register.actions';

@Injectable()
export class AuthEffects {
  public login$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.Login),
        tap(async action => {
          this._store.dispatch(StartLoading());
          const { email, password } = action.payload;
          await this._angularFireAuth
            .signInWithEmailAndPassword(email, password)
            .then((result: FirebaseAuthUserCredential) => {
              const user = result.user;
              if (user) {
                const loggedUser: Partial<User> = {
                  name: user.displayName!,
                  userId: user.uid,
                  photoURL: user.photoURL!,
                  emailVerified: user.emailVerified,
                  email: user.email!,
                };

                this._store.dispatch(AuthActions.SetUserData({ payload: loggedUser }));
                this._router.navigateByUrl(appRoutes.HOME);
                this._store.dispatch(StopLoading());
                this._snackBarService.openSuccessSnackBar('Bem vindo ao Plataforma IPR 😁');
              }
            })
            .catch(error => {
              this._store.dispatch(StopLoading());
              this._snackBarService.openFailureSnackBar(Messages[error.code]);
            });
        })
      ),
    { dispatch: false }
  );

  public loginWithGoogle$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.LoginWithGoogle),
        tap(async () => {
          this._store.dispatch(StartLoading());
          const provider = new auth.GoogleAuthProvider();
          await this._angularFireAuth
            .signInWithPopup(provider)
            .then((result: FirebaseAuthUserCredential) => {
              const isNewUser = result.additionalUserInfo?.isNewUser;
              const user = result.user;
              if (user) {
                const { uid, photoURL, emailVerified, email, displayName } = user;

                if (isNewUser) {
                  const newUser: User = {
                    admin: false,
                    name: displayName!,
                    userId: uid,
                    photoURL,
                    emailVerified,
                    email,
                  };

                  this._store.dispatch(AuthActions.SetNewUserData({ payload: newUser }));
                  this._store.dispatch(AuthActions.SendEmailVerification());
                } else {
                  const loggedUser: Partial<User> = {
                    name: user.displayName!,
                    userId: user.uid,
                    photoURL: user.photoURL!,
                    emailVerified: user.emailVerified,
                    email: user.email!,
                  };
                  this._store.dispatch(AuthActions.SetUserData({ payload: loggedUser }));
                }

                this._router.navigateByUrl(appRoutes.HOME);
                this._store.dispatch(StopLoading());
                this._snackBarService.openSuccessSnackBar('Bem vindo ao Plataforma IPR 😁');
              }
            })
            .catch(error => {
              this._store.dispatch(StopLoading());
              this._snackBarService.openFailureSnackBar(Messages[error.code]);
            });
        })
      ),
    { dispatch: false }
  );

  public signup$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.Signup),
        tap(action => {
          this._store.dispatch(StartLoading());
          const { name, email, password } = action.payload;
          this._angularFireAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result: FirebaseAuthUserCredential) => {
              const user = result.user;
              if (user) {
                const { uid, photoURL, emailVerified, email } = user;
                const newUser = {
                  admin: false,
                  name: name,
                  userId: uid,
                  photoURL,
                  emailVerified,
                  email,
                };

                this._store.dispatch(AuthActions.SetNewUserData({ payload: newUser }));
                this._store.dispatch(AuthActions.SendEmailVerification());
              }
            })
            .catch(error => {
              this._store.dispatch(StopLoading());
              this._snackBarService.openFailureSnackBar(Messages[error.code]);
            });
        })
      ),
    { dispatch: false }
  );

  public sendEmailVerification$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.SendEmailVerification),
        tap(() => {
          this._angularFireAuth.currentUser
            .then(user => user!.sendEmailVerification())
            .then(() => {
              this._router.navigateByUrl(appRoutes.HOME);
              this._store.dispatch(StopLoading());
              this._snackBarService.openSuccessSnackBar('Bem vindo ao Plataforma IPR 😁');
            });
        })
      ),
    { dispatch: false }
  );

  public updateProfile$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.UpdateProfile),
        tap(async action => {
          const profile = {
            displayName: action.payload.name,
          };
          return (await this._angularFireAuth.currentUser)!.updateProfile(profile);
        })
      ),
    { dispatch: false }
  );

  public setNewUserData$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.SetNewUserData),
        tap(async action => {
          const newUser = action.payload;

          const userRef: AngularFirestoreDocument<{ auth: Partial<User> }> =
            this._angularFirestore.doc(`users/${newUser.userId}`);
          this._store.dispatch(AuthActions.UpdateProfile({ payload: newUser }));
          this._store.dispatch(AuthActions.SetUserData({ payload: newUser }));
          this._store.dispatch(RegisterActions.setInitialProcess({ payload: newUser.userId }));

          return userRef.set({ auth: newUser }, { merge: true });
        })
      ),
    { dispatch: false }
  );

  public forgotPassword$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.ForgotPassword),
        tap(async action => {
          this._store.dispatch(StartLoading());
          await this._angularFireAuth
            .sendPasswordResetEmail(action.payload)
            .then(() => {
              this._store.dispatch(StopLoading());
              this._snackBarService.openSuccessSnackBar(
                'Acesse o link enviado na sua caixa de e-mail'
              );
            })
            .catch(error => {
              this._store.dispatch(StopLoading());
              this._snackBarService.openFailureSnackBar(Messages[error.code]);
            });
        })
      ),
    { dispatch: false }
  );

  public logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.Logout),
        tap(async () => {
          this._store.dispatch(StartLoading());
          await this._angularFireAuth.signOut().then(() => {
            this._router.navigateByUrl('/');
            this._store.dispatch(StopLoading());
            this._snackBarService.openSuccessSnackBar('Volte Sempre 😁');
          });
        })
      ),
    { dispatch: false }
  );

  public loadUser$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.LoadUser),
        tap(() => {
          this._angularFireAuth.authState.subscribe(user => {
            if (user) {
              const { email, photoURL, uid, displayName, emailVerified } = user;

              const loggedUser = {
                email,
                photoURL,
                userId: uid!,
                name: displayName!,
                emailVerified,
              } as User;
              this._store.dispatch(AuthActions.SetUserData({ payload: loggedUser }));
              this._store.dispatch(loadMemberData({ payload: uid }));
            }

            const isLogged = user !== null ? true : false;
            this._store.dispatch(AuthActions.UpdateIsLoggedStatus({ payload: isLogged }));
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _angularFirestore: AngularFirestore,
    private readonly _angularFireAuth: AngularFireAuth,
    private readonly _router: Router,
    private readonly _store: Store<fromApp.AppState>,
    private readonly _snackBarService: SnackbarService
  ) {}
}
