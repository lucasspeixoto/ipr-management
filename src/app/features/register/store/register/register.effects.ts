import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromApp from '@app/app.state';

import * as fromRegister from './register.actions';

import { Member } from '@registerMd/member';

import { StartLoading, StopLoading } from '@sharedSt/loading/loading.actions';
import { SnackbarService } from '@sharedS/snackbar/snackbar.service';
import { Messages } from '@shared/messages/firebase';

import { Personal } from '@registerMd/personal';
import { Supplementary } from '@registerMd/supplementary';
import { Ecclesiastical } from '@registerMd/ecclesiastical';
import { Process } from '../../models/process';
import { RegisterActions } from './action-types';

@Injectable()
export class RegisterEffects {
  public loadMemberData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRegister.loadMemberData),
        tap(action => {
          this._store.dispatch(StartLoading());
          const userId = action.payload;
          const url = `users/${userId}`;
          this._angularFirestore
            .doc<Member>(url)
            .valueChanges()
            .subscribe({
              next: memberData => {
                if (memberData) {
                  const { personal, supplementary, ecclesiastical, process, observation } =
                    memberData!;

                  this._store.dispatch(
                    fromRegister.setPersonal({
                      payload: personal,
                      userId,
                    })
                  );
                  this._store.dispatch(fromRegister.setSupplementary({ payload: supplementary }));
                  this._store.dispatch(fromRegister.setEcclesiastical({ payload: ecclesiastical }));

                  this._store.dispatch(fromRegister.setProcess({ payload: process }));

                  this._store.dispatch(fromRegister.setObservation({ payload: observation }));
                }

                this._store.dispatch(StopLoading());
              },
              error: error => {
                this._store.dispatch(StopLoading());
                this._snackBarService.openFailureSnackBar(Messages[error.code]);
              },
            });
        })
      ),
    { dispatch: false }
  );

  public updatePersonal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRegister.updatePersonal),
        tap(async action => {
          const newUser = action.payload;
          const userId = action.userId;
          const userRef: AngularFirestoreDocument<{ personal: Partial<Personal> }> =
            this._angularFirestore.doc(`users/${userId}`);

          return userRef.set({ personal: newUser }, { merge: true });
        })
      ),
    { dispatch: false }
  );

  public updateSupplementary$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRegister.updateSupplementary),
        tap(async action => {
          const newUser = action.payload;
          const userId = action.userId;
          const userRef: AngularFirestoreDocument<{
            supplementary: Partial<Supplementary>;
          }> = this._angularFirestore.doc(`users/${userId}`);

          return userRef.set({ supplementary: newUser }, { merge: true });
        })
      ),
    { dispatch: false }
  );

  public updateEcclesiastical$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRegister.updateEcclesiastical),
        tap(async action => {
          const newUser = action.payload;
          const userId = action.userId;
          const userRef: AngularFirestoreDocument<{
            ecclesiastical: Partial<Ecclesiastical>;
          }> = this._angularFirestore.doc(`users/${userId}`);

          return userRef.set({ ecclesiastical: newUser }, { merge: true });
        })
      ),
    { dispatch: false }
  );

  public setInitialProcessData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.setInitialProcess),
        tap(async action => {
          const userId = action.payload;

          const initialProcess = {
            hasPersonal: false,
            hasEcclesiastical: false,
            hasSupplementary: false,
          };

          const userRef: AngularFirestoreDocument<{ process: Process }> =
            this._angularFirestore.doc(`users/${userId}`);

          return userRef.set({ process: initialProcess }, { merge: true });
        })
      ),
    { dispatch: false }
  );

  public setHasPersonal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.setHasPersonal),
        tap(async action => {
          const { process, userId } = action.payload;

          const newProcess = {
            ...process,
            hasPersonal: true,
          };

          const userRef: AngularFirestoreDocument<{ process: Process }> =
            this._angularFirestore.doc(`users/${userId}`);

          return userRef.set({ process: newProcess }, { merge: true });
        })
      ),
    { dispatch: false }
  );

  public setHasSupplementary$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.setHasSupplementary),
        tap(async action => {
          const { process, userId } = action.payload;

          const newProcess = {
            ...process,
            hasSupplementary: true,
          };

          const userRef: AngularFirestoreDocument<{ process: Process }> =
            this._angularFirestore.doc(`users/${userId}`);

          return userRef.set({ process: newProcess }, { merge: true });
        })
      ),
    { dispatch: false }
  );

  public setHasEcclesiastical$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterActions.setHasEcclesiastical),
        tap(async action => {
          const { process, userId } = action.payload;

          const newProcess = {
            ...process,
            hasEcclesiastical: true,
          };

          const userRef: AngularFirestoreDocument<{ process: Process }> =
            this._angularFirestore.doc(`users/${userId}`);

          return userRef.set({ process: newProcess }, { merge: true });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _store: Store<fromApp.AppState>,
    private readonly _snackBarService: SnackbarService,
    private readonly _angularFirestore: AngularFirestore
  ) {}
}
