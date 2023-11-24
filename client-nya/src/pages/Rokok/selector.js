import { createSelector } from 'reselect';
import { initialState  } from './reducer';

const selectRokokState = (state) => state.rokok || initialState;

export const selectRokok = createSelector(selectRokokState, (state) => state.rokok);
export const selectStock = createSelector(selectRokokState, (state) => state.stock);