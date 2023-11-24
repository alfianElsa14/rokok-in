import { deleteMyRokok, editStatus, getMyRokok, getUserById, midtransPayment, reduceStock } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setMidtransToken, setMyRokok, setUserById, setNewStock } from "./actions";
import { DELETE_MY_ROKOK, EDIT_STATUS, GET_MY_ROKOK, GET_USER_BY_ID, MIDTRANS_PAYMENT, REDUCE_STOCK } from "./constants";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

export function* doGetUserById({ id }) {
    try {
        const response = yield call(getUserById, id)
        yield put(setUserById(response))
    } catch (error) {
        console.log(error);
    }
}

export function* doGetMyRokok() {
    try {
        const result = yield call(getMyRokok)
        yield put(setMyRokok(result))
    } catch (error) {
        console.log(error);
    }
}

export function* doDeleteMyRokok({ id }) {
    try {
        const result = yield call(deleteMyRokok, id)
        Toast.fire({
            icon: "success",
            title: "Rokok di hapus dari keranjang"
          });
        const response = yield call(getMyRokok)
        yield put(setMyRokok(response))
    } catch (error) {
        console.log(error);
    }
}

export function* doMidtransPayment({ id, cbSuccess, cbReduce }) {
    try {
        const result = yield call(midtransPayment, id)
        yield put(setMidtransToken(result.token))

        window.snap.pay(result.token, {
            onSuccess: () => {
                cbSuccess && cbSuccess()
                cbReduce && cbReduce()
                window.location.reload();
            },
            onPending: function (result) {
                console.log('Pembayaran tertunda:', result);
            },
            onError: function (result) {
                console.log('Pembayaran gagal:', result);
            },
            onClose: function () {
                console.log('Widget ditutup tanpa menyelesaikan pembayaran');
            }
        });
       
    } catch (error) {
        console.log(error);
    }
}

export function* doEditStatus({ id }) {
    try {
        const response = yield call(editStatus, id)
    } catch (error) {
        console.log(error);
    }
}

export function* doReduceStock({ id }) {
    try {
        const response = yield call(reduceStock, id)
        yield put(setNewStock(response.newData.stock))
    } catch (error) {
        console.log(error);
    }
}

export default function* profileSaga() {
    yield takeLatest(GET_USER_BY_ID, doGetUserById)
    yield takeLatest(GET_MY_ROKOK, doGetMyRokok)
    yield takeLatest(DELETE_MY_ROKOK, doDeleteMyRokok)
    yield takeLatest(MIDTRANS_PAYMENT, doMidtransPayment)
    yield takeLatest(EDIT_STATUS, doEditStatus)
    yield takeLatest(EDIT_STATUS, doEditStatus)
    yield takeLatest(REDUCE_STOCK, doReduceStock)
}