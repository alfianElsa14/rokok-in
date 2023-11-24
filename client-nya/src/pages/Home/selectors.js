import { createSelector } from 'reselect';
import { initialState  } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectRokoks = createSelector(selectHomeState, (state) => state.rokoks);