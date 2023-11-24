import { produce } from 'immer'
import { SET_ALL_ROKOK } from './constants';

export const initialState = {
    rokoks: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) => 
produce(state, (draft) => {
    switch (action.type) {
        case SET_ALL_ROKOK:
            draft.rokoks = action.rokoks;
            break;
        default:
            break;
    }
})

export default homeReducer;