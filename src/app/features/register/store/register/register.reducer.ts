import { Action, createReducer, on } from '@ngrx/store';
import { Ecclesiastical } from '@registerMd/ecclesiastical';
import { Personal } from '@registerMd/personal';
import { Supplementary } from '@registerMd/supplementary';
import { Process } from '../../models/process';

import {
  removeEcclesiastical,
  removePersonal,
  removeProcess,
  removeSupplementary,
  setEcclesiastical,
  setHasEcclesiastical,
  setHasPersonal,
  setHasSupplementary,
  setInitialProcess,
  setObservation,
  setPersonal,
  setProcess,
  setSupplementary,
  updateEcclesiastical,
  updatePersonal,
  updateSupplementary,
} from './register.actions';

export interface RegisterState {
  personal: Personal | undefined;
  ecclesiastical: Ecclesiastical | undefined;
  supplementary: Supplementary | undefined;
  process: Process | undefined;
  observation: string | null;
}

export const initialState: RegisterState = {
  personal: undefined,
  ecclesiastical: undefined,
  supplementary: undefined,
  process: undefined,
  observation: null,
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
  on(setInitialProcess, _state => {
    return Object.assign({}, _state, {
      process: {
        hasPersonal: false,
        hasEcclesiastical: false,
        hasSupplementary: false,
      },
    });
  }),
  on(setProcess, (_state, { payload }) => {
    return Object.assign({}, _state, {
      process: payload,
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
  }),
  on(setProcess, (_state, { payload }) => {
    return Object.assign({}, _state, {
      process: payload,
    });
  })
);

export function registerReducer(state: RegisterState | undefined, action: Action): RegisterState {
  return _registerReducer(state, action);
}
