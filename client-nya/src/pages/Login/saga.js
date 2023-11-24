import { LOGIN_USER, SET_USER } from "@containers/Client/constants"

import { setUser, setToken, setLogin } from "@containers/Client/actions";
import { login } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
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

function* doLogin({ data }) {
    try {
        const response = yield call(login, data)
        if (!response) {
            Swal.fire("Invalid Email, Password")
        } else {
            yield put(setUser(response))
            yield put(setToken(response.access_token))
            yield put(setLogin(true))
            Toast.fire({
                icon: "success",
                title: "Login in successfully"
              });
        }
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Email or Password required";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Invalid Email or Password");
        }
    }
}

export default function* loginSaga() {
    yield takeLatest(LOGIN_USER, doLogin)
}