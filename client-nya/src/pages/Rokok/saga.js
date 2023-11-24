import { addMyRokok, addStock, deleteRokok, getAllRokok, getRokokById } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setRokokById, setStock } from "./actions";
import { ADD_MY_ROKOK, ADD_STOCK, DELETE_ROKOK, GET_ROKOK_BY_ID } from "./constants";
import Swal from "sweetalert2";
import { setAllRokok } from "@pages/Home/actions";

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
  
export function* doGetRokokById({id}) {
    try {
        const response = yield call(getRokokById, id)
        yield put(setRokokById(response))
    } catch (error) {
        console.log(error);
    }
}

export function* doAddMyRokok({id}) {
    try {
        const response = yield call(addMyRokok, id)
        const result = yield call(getAllRokok);
        yield put(setAllRokok(result))
        Toast.fire({
            icon: "success",
            title: "Rokok di tambahkan ke keranjang"
          });
        window.location.reload();
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Invalid Email or Password");
        }
    }
}

export function* doDeleteRokok({id}) {
    try {
        const response = yield call(deleteRokok, id)
        Swal.fire("Rokok telah di hapus");
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export function* doAddStock({id, data}){
    try {
        const response = yield call(addStock, id, data)
        console.log(response.updatedDataRokok.stock, "<<<<<<<saga");
        yield put(setStock(response.updatedDataRokok.stock))
        Swal.fire("Stock telah ditambahkan");
        window.location.reload();
    } catch (error) {
        console.log(error.response.data);
        Swal.fire("Rokok sudah ada di list anda");
    }
}

export default function* rokokSaga() {
    yield takeLatest(ADD_MY_ROKOK, doAddMyRokok)
    yield takeLatest(GET_ROKOK_BY_ID, doGetRokokById)
    yield takeLatest(DELETE_ROKOK, doDeleteRokok)
    yield takeLatest(ADD_STOCK, doAddStock)
}