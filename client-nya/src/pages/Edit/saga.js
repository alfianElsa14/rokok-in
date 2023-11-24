import { editProfile } from "@domain/api";
import { call, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import { EDIT_PROFILE } from "./constants";

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
  
export function* doEditProfile({id, data}) {
    try {
        const response = yield call(editProfile, id, data)
        Toast.fire({
            icon: "success",
            title: "Profile telah di ubah"
          });
          window.location.reload();
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

export default function* editSaga() {
    yield takeLatest(EDIT_PROFILE, doEditProfile)
}