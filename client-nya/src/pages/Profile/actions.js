import { DELETE_MY_ROKOK, EDIT_STATUS, GET_MY_ROKOK, GET_USER_BY_ID, MIDTRANS_PAYMENT, REDUCE_STOCK, SET_MIDTRANS_TOKEN, SET_MY_ROKOK, SET_NEW_STOCK, SET_USER_BY_ID } from './constants'

export const getUsertById = (id) => ({
    type: GET_USER_BY_ID,
    id
})

export const setUserById = (user) => ({
    type: SET_USER_BY_ID,
    user
})

export const getMyRokok = () => ({
    type: GET_MY_ROKOK,
})

export const setMyRokok = (myRokok) => ({
    type: SET_MY_ROKOK,
    myRokok
})

export const deleteMyRokok = (id) => ({
    type: DELETE_MY_ROKOK,
    id
})

export const midtransPayment = (id, cbSuccess, cbReduce) => ({
    type: MIDTRANS_PAYMENT,
    id,
    cbSuccess,
    cbReduce
})

export const setMidtransToken = (midtransToken) => ({
    type: SET_MIDTRANS_TOKEN,
    midtransToken
})

export const actionEditStatus = (id) => ({
    type: EDIT_STATUS,
    id
})

export const reduceStock = (id) => ({
    type: REDUCE_STOCK,
    id
})

export const setNewStock = (newStock) => ({
    type: SET_NEW_STOCK,
    newStock
})