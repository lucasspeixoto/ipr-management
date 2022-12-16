import { createAction, props } from '@ngrx/store';

import { LoginForm } from '@authMd/login-form.model';
import { SignUpForm } from '@authMd/signup-form.model';
import { User } from '@authMd/user.model';

export enum Actions {
  SIGNUP = '[SignUp Page] User Signup',
  EMAIL_VERIFICATION = '[AuthEffects] Send User E-mail verification',
  LOGOUT = '[Header] Logout user',
  UPDATE_PROFILE = '[AuthEffects] Update Firebase User displayName',
  SET_NEW_USER_DATA = '[AuthEffects] Inser new User in Firestore Database',
  UPDATE_IS_LOGGED_STATUS = '[App Component] Update auth isLogged status',
  SET_USER_DATA = '[App Component] Set auth user status',
  LOGIN = '[Login Page] User Login',
  LOGIN_WITH_GOOGLE = '[Login Page] User Login With Google',
  FORGOT_PASSWORD = '[Forgot Password Page] Send user E-mail for change password',
  LOAD_USER = '[App Component] Load logged user',
  LOAD_USER_SUCCESS = '[App Component] Load logged user Success',

  SET_INITIAL_PROCESS = '[AuthEffects] Set Initial Process Data',
}

export const Login = createAction(Actions.LOGIN, props<{ payload: LoginForm }>());

export const LoginWithGoogle = createAction(Actions.LOGIN_WITH_GOOGLE);

export const Signup = createAction(Actions.SIGNUP, props<{ payload: SignUpForm }>());

export const SendEmailVerification = createAction(Actions.EMAIL_VERIFICATION);

export const UpdateProfile = createAction(
  Actions.UPDATE_PROFILE,
  props<{ payload: Partial<User> }>()
);

export const SetNewUserData = createAction(
  Actions.SET_NEW_USER_DATA,
  props<{ payload: Partial<User> }>()
);

export const UpdateIsLoggedStatus = createAction(
  Actions.UPDATE_IS_LOGGED_STATUS,
  props<{ payload: boolean }>()
);

export const SetUserData = createAction(Actions.SET_USER_DATA, props<{ payload: Partial<User> }>());

export const Logout = createAction(Actions.LOGOUT);

export const ForgotPassword = createAction(Actions.FORGOT_PASSWORD, props<{ payload: string }>());

export const LoadUser = createAction(Actions.LOAD_USER);

export const LoadUserSuccess = createAction(Actions.LOAD_USER_SUCCESS);

export const SetInitialProcess = createAction(
  Actions.SET_INITIAL_PROCESS,
  props<{ payload: string | undefined }>()
);
