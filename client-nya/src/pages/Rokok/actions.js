import { ADD_MY_ROKOK, ADD_STOCK, DELETE_ROKOK, GET_ROKOK_BY_ID, SET_ROKOK_BY_ID, SET_STOCK } from "./constants"

export const getRokokById = (id) => ({
    type: GET_ROKOK_BY_ID,
    id
})

export const setRokokById = (rokok) => ({
    type: SET_ROKOK_BY_ID,
    rokok
})

export const addMyRokok = (id) => ({
    type: ADD_MY_ROKOK,
    id
})

export const deleteRokok = (id) => ({
    type: DELETE_ROKOK,
    id
})

export const addStock = (id, data) => ({
    type: ADD_STOCK,
    id,
    data
})

export const setStock = (stock) => ({
    type: SET_STOCK,
    stock
})