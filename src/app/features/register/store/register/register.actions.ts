import { createAction, props } from '@ngrx/store';
import { Personal } from '@registerMd/personal';
import { Ecclesiastical } from '@registerMd/ecclesiastical';
import { Process } from '@registerMd/process';
import { Supplementary } from '@registerMd/supplementary';

export enum registerActions {
  LOAD_DATA = '[Personal] Load Personal Data',

  SET_PERSONAL_DATA = '[Personal] Set Personal Data',
  REMOVE_PERSONAL_DATA = '[Personal] Remove Personal Data',
  UPDATE_PERSONAL_DATA = '[Personal] Update Personal Data',

  SET_SUPPLEMENTARY = '[Supplementary] Set Supplementary Data',
  REMOVE_SUPPLEMENTARY = '[Supplementary] Remove Supplementary Data',
  UPDATE_SUPPLEMENTARY_DATA = '[Supplementary] Update Supplementary Data',

  SET_ECCLESIASTICAL = '[Ecclesiastical] Set Ecclesiastical Data',
  REMOVE_ECCLESIASTICAL = '[Ecclesiastical] Remove Ecclesiastical Data',

  SET_PROCESS = '[Process] Set Process',
  SET_HAS_PERSONAL = '[Process] Set Has Personal',
  SET_HAS_SUPPLEMENTARY = '[Process] Set Has Supplementary',
  SET_HAS_ECCLESIASTICAL = '[Process] Set Has Ecclesiastical',
  REMOVE_PROCESS = '[Process] Remove Process Data',

  SET_OBSERVATION = '[Observation] Set Observation',
}

export const loadMemberData = createAction(
  registerActions.LOAD_DATA,
  props<{ payload: string | null }>()
);

//? ---------------- Personal ---------------- //
export const setPersonal = createAction(
  registerActions.SET_PERSONAL_DATA,
  props<{ payload: Partial<Personal>; userId?: string | null }>()
);
export const updatePersonal = createAction(
  registerActions.UPDATE_PERSONAL_DATA,
  props<{ payload: Partial<Personal>; userId?: string | null }>()
);
export const removePersonal = createAction(registerActions.REMOVE_PERSONAL_DATA);

//? ---------------- Supplementary ---------------- //
export const setSupplementary = createAction(
  registerActions.SET_SUPPLEMENTARY,
  props<{ payload: Supplementary }>()
);
export const updateSupplementary = createAction(
  registerActions.UPDATE_SUPPLEMENTARY_DATA,
  props<{ payload: Partial<Supplementary>; userId?: string | null }>()
);
export const removeSupplementary = createAction(registerActions.REMOVE_SUPPLEMENTARY);

//? ---------------- Ecclesiastical ---------------- //
export const setEcclesiastical = createAction(
  registerActions.SET_ECCLESIASTICAL,
  props<{ payload: Ecclesiastical }>()
);
export const removeEcclesiastical = createAction(registerActions.REMOVE_ECCLESIASTICAL);

//? ---------------- Process ---------------- //
export const setProcess = createAction(
  registerActions.SET_PROCESS,
  props<{ payload: Process }>()
);
export const setHasPersonal = createAction(registerActions.SET_HAS_PERSONAL);
export const setHasSupplementary = createAction(registerActions.SET_HAS_SUPPLEMENTARY);
export const setHasEcclesiastical = createAction(registerActions.SET_HAS_ECCLESIASTICAL);
export const removeProcess = createAction(registerActions.REMOVE_PROCESS);

//? ---------------- Observation ---------------- //
export const setObservation = createAction(
  registerActions.SET_OBSERVATION,
  props<{ payload: string }>()
);
