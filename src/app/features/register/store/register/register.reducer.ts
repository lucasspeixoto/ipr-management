import { Action, createReducer, on } from '@ngrx/store';
import { Ecclesiastical } from '../../models/ecclesiastical';
import { Personal } from '../../models/personal';
import { Supplementary } from '../../models/supplementary';

import {
  removeEcclesiastical,
  removePersonal,
  removeProcess,
  removeSupplementary,
  setEcclesiastical,
  setHasEcclesiastical,
  setHasPersonal,
  setHasSupplementary,
  setObservation,
  setPersonal,
  setSupplementary,
  updateEcclesiastical,
  updatePersonal,
  updateSupplementary,
} from './register.actions';

export interface RegisterState {
  personal: Personal | undefined;
  ecclesiastical: Ecclesiastical | undefined;
  supplementary: Supplementary | undefined;
  process:
    | {
        hasPersonal?: boolean;
        hasSupplementary?: boolean;
        hasEcclesiastical?: boolean;
      }
    | undefined;
  observation: string;
}

export const initialState: RegisterState = {
  personal: undefined,
  ecclesiastical: undefined,
  supplementary: undefined,
  process: undefined,
  observation: '',
};

const _registerReducer = createReducer(
  initialState,
  on(setPersonal, (_state, { payload }) => {
    return Object.assign({}, _state, {
      personal: payload,
    });
  }),
  on(updatePersonal, (_state, { payload }) => {
    return Object.assign({}, _state, {
      personal: payload,
    });
  }),
  on(removePersonal, _state => {
    return Object.assign({}, _state, {
      personal: undefined,
    });
  }),

  on(setEcclesiastical, (_state, { payload }) => {
    return Object.assign({}, _state, {
      ecclesiastical: payload,
    });
  }),
  on(updateEcclesiastical, (_state, { payload }) => {
    return Object.assign({}, _state, {
      ecclesiastical: payload,
    });
  }),
  on(removeEcclesiastical, _state => {
    return Object.assign({}, _state, {
      ecclesiastical: undefined,
    });
  }),

  on(setSupplementary, (_state, { payload }) => {
    return Object.assign({}, _state, {
      supplementary: payload,
    });
  }),
  on(updateSupplementary, (_state, { payload }) => {
    return Object.assign({}, _state, {
      supplementary: payload,
    });
  }),

  on(removeSupplementary, _state => {
    return Object.assign({}, _state, {
      supplementary: undefined,
    });
  }),

  on(setHasPersonal, _state => {
    return Object.assign({}, _state, {
      process: {
        ..._state.process,
        hasPersonal: true,
      },
    });
  }),

  on(setHasSupplementary, _state => {
    return Object.assign({}, _state, {
      process: {
        ..._state.process,
        hasSupplementary: true,
      },
    });
  }),

  on(setHasEcclesiastical, _state => {
    return Object.assign({}, _state, {
      process: {
        ..._state.process,
        hasEcclesiastical: true,
      },
    });
  }),

  on(removeProcess, _state => {
    return Object.assign({}, _state, {
      process: undefined,
    });
  }),

  on(setObservation, (_state, { payload }) => {
    return Object.assign({}, _state, {
      observation: payload,
    });
  })
);

export function registerReducer(
  state: RegisterState | undefined,
  action: Action
): RegisterState {
  return _registerReducer(state, action);
}
