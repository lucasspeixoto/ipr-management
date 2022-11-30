import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '@authSt/auth.reducer';

import * as fromLoading from '@sharedSt/loading/loading.reducer';
import * as fromMessage from '@sharedSt/message/message.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  loading: fromLoading.LoadingState;
  message: fromMessage.MessageState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  loading: fromLoading.loadingReducer,
  message: fromMessage.messageReducer,
};
