import { createAction, props } from '@ngrx/store';
import { Personal } from '@registerMd/personal';
import { Ecclesiastical } from '@registerMd/ecclesiastical';
import { Process } from '@registerMd/process';
import { Supplementary } from '@registerMd/supplementary';

export enum Actions {
  LOAD_DATA = '[Personal] Load Personal Data',

  SET_PERSONAL_DATA = '[Personal] Set Personal Data',
  REMOVE_PERSONAL_DATA = '[Personal] Remove Personal Data',
  UPDATE_PERSONAL_DATA = '[Personal] Update Personal Data',

  SET_SUPPLEMENTARY = '[Supplementary] Set Supplementary Data',
  REMOVE_SUPPLEMENTARY = '[Supplementary] Remove Supplementary Data',
  UPDATE_SUPPLEMENTARY_DATA = '[Supplementary] Update Supplementary Data',

  SET_ECCLESIASTICAL = '[Ecclesiastical] Set Ecclesiastical Data',
  REMOVE_ECCLESIASTICAL = '[Ecclesiastical] Remove Ecclesiastical Data',
  UPDATE_ECCLESIASTICAL_DATA = '[Ecclesiastical] Update Ecclesiastical Data',

  SET_PROCESS = '[Process] Set Process',
  SET_HAS_PERSONAL = '[Process] Set Has Personal',
  SET_HAS_SUPPLEMENTARY = '[Process] Set Has Supplementary',
  SET_HAS_ECCLESIASTICAL = '[Process] Set Has Ecclesiastical',
  REMOVE_PROCESS = '[Process] Remove Process Data',
  SET_INITIAL_PROCESS = '[Process] Set Initial Process Data',

  SET_OBSERVATION = '[Observation] Set Observation',
}

export const loadMemberData = createAction(Actions.LOAD_DATA, props<{ payload: string | null }>());

//? ---------------- Personal ---------------- //
export const setPersonal = createAction(
  Actions.SET_PERSONAL_DATA,
  props<{ payload: Partial<Personal>; userId?: string | null }>()
);
export const updatePersonal = createAction(
  Actions.UPDATE_PERSONAL_DATA,
  props<{ payload: Partial<Personal>; userId?: string | null }>()
);
export const removePersonal = createAction(Actions.REMOVE_PERSONAL_DATA);

//? ---------------- Supplementary ---------------- //
export const setSupplementary = createAction(
  Actions.SET_SUPPLEMENTARY,
  props<{ payload: Supplementary }>()
);
export const updateSupplementary = createAction(
  Actions.UPDATE_SUPPLEMENTARY_DATA,
  props<{ payload: Partial<Supplementary>; userId?: string | null }>()
);
export const removeSupplementary = createAction(Actions.REMOVE_SUPPLEMENTARY);

//? ---------------- Ecclesiastical ---------------- //
export const setEcclesiastical = createAction(
  Actions.SET_ECCLESIASTICAL,
  props<{ payload: Ecclesiastical }>()
);
export const updateEcclesiastical = createAction(
  Actions.UPDATE_ECCLESIASTICAL_DATA,
  props<{ payload: Partial<Ecclesiastical>; userId?: string | null }>()
);
export const removeEcclesiastical = createAction(Actions.REMOVE_ECCLESIASTICAL);

//? ---------------- Process ---------------- //
export const setInitialProcess = createAction(
  Actions.SET_INITIAL_PROCESS,
  props<{ payload: string | undefined }>()
);
export const setProcess = createAction(Actions.SET_PROCESS, props<{ payload: Process }>());
export const setHasPersonal = createAction(
  Actions.SET_HAS_PERSONAL,
  props<{
    payload: {
      process: Process | undefined;
      userId: string | undefined;
    };
  }>()
);
export const setHasSupplementary = createAction(
  Actions.SET_HAS_SUPPLEMENTARY,
  props<{
    payload: {
      process: Process | undefined;
      userId: string | undefined;
    };
  }>()
);
export const setHasEcclesiastical = createAction(
  Actions.SET_HAS_ECCLESIASTICAL,
  props<{
    payload: {
      process: Process | undefined;
      userId: string | undefined;
    };
  }>()
);
export const removeProcess = createAction(Actions.REMOVE_PROCESS);

//? ---------------- Observation ---------------- //
export const setObservation = createAction(Actions.SET_OBSERVATION, props<{ payload: string }>());
