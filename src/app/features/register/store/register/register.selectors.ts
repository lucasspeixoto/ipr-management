import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegister from './register.reducer';

export const getRegisterState =
  createFeatureSelector<fromRegister.RegisterState>('register');

export const getPersonal = createSelector(getRegisterState, state => state.personal);

export const getEcclesiastical = createSelector(
  getRegisterState,
  state => state.ecclesiastical
);

export const getSupplementary = createSelector(
  getRegisterState,
  state => state.supplementary
);

export const getProcess = createSelector(getRegisterState, state => state.process);

export const getObservation = createSelector(
  getRegisterState,
  state => state.observation
);
