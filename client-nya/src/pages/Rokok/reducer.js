import { produce } from 'immer'
import { SET_ROKOK_BY_ID, SET_STOCK } from './constants';

export const initialState = {
    rokok: {},
    stock: 0
}

export const storedKey = [];

const rokokReducer = (state = initialState, action) => 
produce(state, (draft) => {
    switch (action.type) {
        case SET_ROKOK_BY_ID:
            draft.rokok = action.rokok;
            break;
        case SET_STOCK:
            draft.stock = action.stock;
            break;
        default:
            break;
    }
})

export default rokokReducer;