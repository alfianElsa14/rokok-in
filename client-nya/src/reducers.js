import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import homeReducer, { storedKey as storedHomeState } from '@pages/Home/reducer';
import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';
import rokokReducer, { storedKey as storedRokokState } from '@pages/Rokok/reducer';
import profileReducer, { storedKey as storedProfileState } from '@pages/Profile/reducer';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  home: {reducer: homeReducer, storedHomeState},
  rokok: {reducer: rokokReducer, storedRokokState},
  user: {reducer: profileReducer, storedProfileState}
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
