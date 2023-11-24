import { produce } from 'immer'
import { SET_MIDTRANS_TOKEN, SET_MY_ROKOK, SET_NEW_STOCK, SET_USER_BY_ID } from './constants';
import { stepConnectorClasses } from '@mui/material';

export const initialState = {
    user: {},
    myRokok: [],
    midtransToken: null,
    newStock: null
}

export const storedKey = [];

const profileReducer = (state = initialState, action) => 
produce(state, (draft) => {
    switch (action.type) {
        case SET_USER_BY_ID:
            draft.user = action.user
            break;
        case SET_MY_ROKOK:
            draft.myRokok = action.myRokok
            break;
        case SET_MIDTRANS_TOKEN:
            draft.midtransToken = action.midtransToken
            break;
        case SET_NEW_STOCK:
            draft.newStock = action.newStock
            break;
        default:
            break;
    }
})

export default profileReducer;