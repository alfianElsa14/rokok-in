import { createSelector } from 'reselect';
import { initialState  } from './reducer';

const selectUserState = (state) => state.user || initialState;

export const selectProfile = createSelector(selectUserState, (state) => state.user);
export const selectMyRokok = createSelector(selectUserState, (state) => state.myRokok);
export const selectMidtransToken = createSelector(selectUserState, (state) => state.midtransToken);
export const selectNewStock = createSelector(selectUserState, (state) => state.newStock);