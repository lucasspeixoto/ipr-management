import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '@authSt/auth.reducer';

import * as fromLoading from '@sharedSt/loading/loading.reducer';
import * as fromMessage from '@sharedSt/message/message.reducer';
import * as fromRegister from '@registerSt/register/register.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  loading: fromLoading.LoadingState;
  message: fromMessage.MessageState;
  register: fromRegister.RegisterState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  loading: fromLoading.loadingReducer,
  message: fromMessage.messageReducer,
  register: fromRegister.registerReducer,
};
