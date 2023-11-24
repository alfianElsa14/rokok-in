import { GET_ALL_ROKOK, SET_ALL_ROKOK } from "./constants";

export const getAllRokok = () => ({
    type: GET_ALL_ROKOK
})

export const setAllRokok = (rokoks) => ({
    type: SET_ALL_ROKOK,
    rokoks
})