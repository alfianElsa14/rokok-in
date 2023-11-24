import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@pages/Login/saga';
import registerSaga from '@pages/Register/saga';
import homeSaga from '@pages/Home/saga';
import rokokSaga from '@pages/Rokok/saga';
import profileSaga from '@pages/Profile/saga';
import editSaga from '@pages/Edit/saga';
import addSaga from '@pages/Add/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    registerSaga(),
    homeSaga(),
    rokokSaga(),
    profileSaga(),
    editSaga(),
    addSaga(),
  ]);
}
