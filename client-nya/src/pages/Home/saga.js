import { getAllRokok } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setAllRokok } from "./actions";
import { GET_ALL_ROKOK } from "./constants";

export function* doGetAllRokok() {
    try {
        const response = yield call(getAllRokok);
        yield put(setAllRokok(response))
    } catch (error) {
        console.log(error);
    }
}

export default function* homeSaga() {
    yield takeLatest(GET_ALL_ROKOK, doGetAllRokok);
}