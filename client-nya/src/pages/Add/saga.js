import { addRokok } from "@domain/api";
import { call, takeLatest } from "redux-saga/effects";
import { ADD_ROKOK } from "./constants";
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

export function* doAddRokok({data}) {
    try {
        const response = yield call(addRokok, data)
        if (!response) {
            Swal.fire("Add Rokok failed. Please try again.");
        } else {
            Toast.fire({
                icon: "success",
                title: "Rokok telah ditambahkan"
              });
              window.location.reload();
        }
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Email or Password required";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("failed edit profile");
        }
    }
}

export default function* addSaga() {
    yield takeLatest(ADD_ROKOK, doAddRokok)
}