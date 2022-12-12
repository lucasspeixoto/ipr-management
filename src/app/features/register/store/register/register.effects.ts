import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

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
import { Supplementary } from '../../models/supplementary';

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
            .doc(url)
            .valueChanges()
            .subscribe({
              next: memberData => {
                const data = memberData as Member;
                this._store.dispatch(
                  fromRegister.setPersonal({
                    payload: data.personal,
                    userId,
                  })
                );
                this._store.dispatch(
                  fromRegister.setEcclesiastical({ payload: data.ecclesiastical })
                );
                this._store.dispatch(
                  fromRegister.setSupplementary({ payload: data.supplementary })
                );
                this._store.dispatch(fromRegister.setProcess({ payload: data.process }));

                this._store.dispatch(
                  fromRegister.setObservation({ payload: data.observation })
                );

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

  constructor(
    private readonly actions$: Actions,
    private readonly _store: Store<fromApp.AppState>,
    private readonly _snackBarService: SnackbarService,
    private readonly _angularFirestore: AngularFirestore
  ) {}
}
